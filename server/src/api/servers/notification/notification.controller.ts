import { Role } from '../../auth/auth.types';
import { Notification, SendSchedule, NotificationTitle } from './notification.types';
import { Socket, Server } from 'socket.io';

const io = new Server(3001, {
    cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io']
    }
});

export const sendSchedule = (req: SendSchedule, socket: Socket) => {
    const schoolID = io.sockets.sockets.get(req.schoolId);

    if (NotificationTitle.ENROLLMENT )
        if (schoolID && Role.ADMIN) schoolID.emit('recieve_enrollment', req.studentId, req.date, req.courseId);

    if (NotificationTitle.RESCHEDULE)
    if (schoolID && Role.ADMIN) schoolID.emit('recieve_resched', req.studentId, req.date, req.courseId);
}

export const sendApproval = (req: Notification, socket: Socket) => {
    const studentID = io.sockets.sockets.get(req.target.userId);
    
    if (studentID && Role.STUDENT) studentID.emit('recieve_approval', req.content, req.status);
}

export const sendNewAppointment = (req: SendSchedule, socket: Socket) => {
    const studentID = io.sockets.sockets.get(req.target.userId);
    const instructorID = io.sockets.sockets.get(req.target.userId);

    if (studentID && Role.STUDENT) studentID.emit('recieve_new_appointment', req.content, req.date);
    if (instructorID && Role.INSTRUCTOR) instructorID.emit('recieve_new_appointment', req.content, req.studentId, req.date);
}