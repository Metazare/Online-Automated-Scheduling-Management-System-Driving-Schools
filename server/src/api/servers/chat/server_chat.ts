import { sendMessageToAdmin, sendMessageToStudent, sendMessageToInstructor } from './chat.controller';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import express from 'express';

// Routes
import schoolRoute from '../../school/school.route';
import studentRoute from '../../student/student.route';

const app = express();

app.use('/schools', schoolRoute);
app.use('/students', studentRoute);

const io = new Server(5000, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

// Websocket Functions

io.on('connection', (socket) => {

    // Chat System
    // sending chat to admin
    socket.on('send_chat_to_admin', (message) => {
        sendMessageToAdmin(message, socket);
    });

    // sending chat to student
    socket.on('send_chat_to_student', (message) => {
        sendMessageToStudent(message, socket);
    });

    // sending chat to instructor
    socket.on('send_chat_to_instructor', (message) => {
        sendMessageToInstructor(message, socket);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

