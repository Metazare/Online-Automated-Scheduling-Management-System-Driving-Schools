import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { sendSchedule, sendApproval, sendNewAppointment } from './notification.controller';
import { send } from 'process';

// General Namespace
const io = new Server(5000, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

// Websocket Functions
io.on('connection', (socket) => {

    // getting enrollment data from student | sending to Admin
    socket.on('send_enrollment', (request) => {

        // Sending to a specific user using school id 
        sendSchedule(request);
    });


    // getting reschedule data from student | sending to Admin
    socket.on('send_resched', (request) => {

        // Sending to a specific user using school schoolId
        sendSchedule(request);
    });


    // getting approval data from Admin | sending to student
    socket.on('send_approval', (request) => {

        // sending to the specific student using student id
        sendApproval(request);
    })


    // getting new appointment data from Admin | sending to student 
    socket.on('send_new_appointment', (request) => {

        // sending to the specific student using student id and instructor id
        sendNewAppointment(request);
    })


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
