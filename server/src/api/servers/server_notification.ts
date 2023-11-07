import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import express from 'express';

// Routes
import schoolRoute from '../school/school.route';
import studentRoute from '../student/student.route';

const app = express();

app.use('/schools', schoolRoute);
app.use('/students', studentRoute);

const io = new Server(3001, {
    cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io/']
    }
});

// Websocket Functions

// Setting up the school id as the socket id
// const schoolId = getSchoolId();

// Setting up the student id as the socket id
// const studentId = getStudentId();

io.on('connection', (socket) => {
    // Initiallizing the socket id with the school id
    // socket.data.schoolId = schoolId;

    // Initiallizing the socket id with the student id
    // socket.data.studentId = studentId;

    // Notification System
    // getting data from client
    socket.on('send_notification', (studentName, appointmentDate, course) => {
        console.log(studentName, appointmentDate, course);

        // sending to every client with also the sender
        // once the school id / student id is set, comment this out and use the code on the bottom
        socket.emit('recieve_notification', studentName, appointmentDate, course);

        // sending to every client except the sender
        socket.broadcast.emit('recieve_notification', studentName, appointmentDate, course);

        // Sending to a specific user using school id or student id
        // io.to(socket.schoolId).emit(studentName, appointmentDate, course)
        // io.to(socket.studentId).emit(studentName, appointmentDate, course)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

instrument(io, { auth: false });
