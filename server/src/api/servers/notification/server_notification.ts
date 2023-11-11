import { Server, Socket } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { sendSchedule, sendApproval, sendNewAppointment } from './notification.controller';
import { send } from 'process';

// General Namespace
const io = new Server(3001, {
    cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io']
    }
});

// Websocket Functions
io.on('connection', (socket) => {

    // getting enrollment data from student | sending to Admin
    socket.on('send_enrollment', (request) => {

        // Sending to a specific user using school id 
        sendSchedule(request, socket);
    });


    // getting reschedule data from student | sending to Admin
    socket.on('send_resched', (request) => {

        // Sending to a specific user using school schoolId
        sendSchedule(request, socket);
    });


    // getting approval data from Admin | sending to student
    socket.on('send_approval', (request) => {

        // sending to the specific student using student id
        sendApproval(request, socket);
    })


    // getting new appointment data from Admin | sending to student 
    socket.on('send_new_appointment', (request) => {

        // sending to the specific student using student id and instructor id
        sendNewAppointment(request, socket);
    })


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// admin panel of the websocket
// the auth is false since idk how to authenticate the user yet
instrument(io, { auth: false });
