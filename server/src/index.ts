import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

// Middlewares
import authenticate from './middlewares/authenticate';
import errorHandler from './middlewares/errorHandler';

// Routes
import appointmentRoute from './api/appointment/appointment.route';
import authRoute from './api/auth/auth.route';
import courseRoute from './api/course/course.route';
import enrollmentRoute from './api/enrollment/enrollment.route';
import instructorRoute from './api/instructor/instructor.route';
import schoolRoute from './api/school/school.route';
import studentRoute from './api/student/student.route';
import lessonRoute from './api/lesson/lesson.route';

// Websocket
import { Server } from "socket.io";
import { instrument } from '@socket.io/admin-ui';

import { NotFound } from './utilities/errors';
import envs from './utilities/envs';

const { PORT, MONGO_URI, CORS_ORIGIN } = envs;

const app = express();

const io = new Server(5000, { 
    cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io"]
    },
});

app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use('/auth', authRoute);
app.use(authenticate);
app.use('/appointments', appointmentRoute);
app.use('/courses', courseRoute);
app.use('/enrollments', enrollmentRoute);
app.use('/instructors', instructorRoute);
app.use('/schools', schoolRoute);
app.use('/students', studentRoute);
app.use('/lessons', lessonRoute);

app.use((_req, _res, next) => next(new NotFound()));
app.use(errorHandler);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch(console.error);


// Websocket Functions

// Setting up the school id as the socket id
// const schoolId = getSchoolId();

io.on("connection", socket => {

    // getting data from client
    socket.on('send_notification', (studentName, appointmentDate, course) => {
        console.log(studentName, appointmentDate, course);

        // Initiallizing the socket id with the school id
        // socket.data.schoolId = schoolId;
        
        // sending to every client
        io.emit('recieve_notification', studentName, appointmentDate, course);
        
        // Sending to a specific school using school id
        // io.to(socket.schoolId).emit(studentName, appointmentDate, course)
    })
    
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

// admin panel of the websocket
// the auth is false since idk how to authenticate the user yet
instrument(io, { auth: false });