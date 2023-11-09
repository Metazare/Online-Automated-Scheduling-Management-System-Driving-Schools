import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import express from 'express';

// Routes
import schoolRoute from '../../school/school.route';
import studentRoute from '../../student/student.route';

const app = express();

app.use('/schools', schoolRoute);
app.use('/students', studentRoute);

const io = new Server(3001, {
    cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io']
    }
});

// Websocket Functions

io.on('connection', (socket) => {

    // Chat System
    // sending chat to admin
    socket.on('send_chat_to_admin', (message, adminId, cb) => {
        console.log(message, adminId, cb);

        socket.to(adminId).emit('recieve_chat_from_admin', message);
    });

    // sending chat to student
    socket.on('send_chat_to_admin', (message, studentId, cb) => {
        console.log(message, studentId, cb);

        socket.to(studentId).emit('recieve_chat_from_admin', message);
    });

    // sending chat to instructor
    socket.on('send_chat_to_admin', (message, instructorId, cb) => {
        console.log(message, instructorId, cb);

        socket.to(instructorId).emit('recieve_chat_from_admin', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// admin panel of the websocket
// the auth is false since idk how to authenticate the user yet
instrument(io, { auth: false });
