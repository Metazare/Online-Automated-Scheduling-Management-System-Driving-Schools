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

    // Chat System
    // Call back for sending/recieving chat/message
    socket.on('send_chat', (studentName, appointmentDate, course, cb) => {
        console.log(studentName, appointmentDate, course);

        // create code for emitting the sending part of the chat here
        // socket.to(socket.schoolId).emit('recieve_chat', message);
        // socket.to(socket.studentId).emit('recieve_chat', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

instrument(io, { auth: false });
