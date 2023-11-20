import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';
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
import chatRoute from './api/chat/chat.route';
import courseRoute from './api/course/course.route';
import enrollmentRoute from './api/enrollment/enrollment.route';
import instructorRoute from './api/instructor/instructor.route';
import lessonRoute from './api/lesson/lesson.route';
import notificationRoute from './api/notification/notification.route';
import otpRoute from './api/otp/otp.route';
import schoolRoute from './api/school/school.route';
import studentRoute from './api/student/student.route';

import { createNotification } from './api/notification/notification.controller';
import { CreateNotification } from './api/notification/notification.types';
import { NotFound } from './utilities/errors';
import envs from './utilities/envs';
import { CreateMessage } from './api/chat/chat.types';
import { createMessage } from './api/chat/chat.controller';

const { PORT, MONGO_URI, CORS_ORIGIN } = envs;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: CORS_ORIGIN,
        credentials: true
    }
});

app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use('/otp', otpRoute);
app.use('/auth', authRoute);
app.use(authenticate);
app.use('/appointments', appointmentRoute);
app.use('/chats', chatRoute);
app.use('/courses', courseRoute);
app.use('/enrollments', enrollmentRoute);
app.use('/instructors', instructorRoute);
app.use('/lessons', lessonRoute);
app.use('/notifications', notificationRoute);
app.use('/schools', schoolRoute);
app.use('/students', studentRoute);

app.use((_req, _res, next) => next(new NotFound()));
app.use(errorHandler);

io.on('connection', (socket) => {
    /**
     * sender
     * targets
     * content
     */
    socket.on('notification', async (req: CreateNotification) => {
        await createNotification(req);
        io.emit('notification', req);
    });

    /**
     * sender
     * receiver
     * message
     */
    socket.on('chat', async (req: CreateMessage) => {
        await createMessage(req);
        io.emit('chat', req);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to database');
        server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch(console.error);
