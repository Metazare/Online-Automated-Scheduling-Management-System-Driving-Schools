import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import express from 'express';

// Routes
import schoolRoute from '../../school/school.route';
import studentRoute from '../../student/student.route';

const app = express();

app.use('/schools', schoolRoute);
app.use('/students', studentRoute);

// General Namespace
const io = new Server(3001, {
    cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io']
    }
});

// Websocket Functions
io.on('connection', (socket) => {

    // getting enrollment data from student | Admin
    socket.on('send_enrollment', (studentId, date, courseId, schoolId) => {
        console.log(studentId, date, courseId, schoolId);

        // upload to data base...
        // check if that data is in the database

        // Sending to a specific user using school id 
        socket.to(schoolId).emit('recieve_enrollment', studentId, date, courseId);
    });

    // getting reschedule data from student | Admin
    socket.on('send_resched', (studentId, date, courseId, schoolId) => {
        console.log(studentId, date, courseId, schoolId);

        // upload to data base...
        // check if that data is in the database

        // Sending to a specific user using school schoolId
        socket.to(schoolId).emit('recieve_resched', studentId, date, courseId);
    });

    // getting approval data from Admin | sending to student
    socket.on('send_approval', (message, appointment_status, studentId) => {
        console.log(message, appointment_status, studentId);

        // sending to the specific student using student id
        socket.to(studentId).emit('recieve_approval', message, appointment_status);
    })

    // getting new appointment data from Admin | sending to student 
    socket.on('send_new_appointment', (message, appointment_date, studentId, instructorID) => {
        console.log(message, appointment_date, studentId, instructorID);

        // sending to the specific student using student id
        socket.to(studentId).emit('recieve_new_appointment', message, appointment_date);

        // sending to the specific student using instructor id
        socket.to(instructorID).emit('recieve_new_appointment', message, studentId, appointment_date);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// admin panel of the websocket
// the auth is false since idk how to authenticate the user yet
instrument(io, { auth: false });
