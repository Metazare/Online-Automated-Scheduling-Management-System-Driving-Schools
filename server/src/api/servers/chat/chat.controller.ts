import { Chat } from "./chat.types";
import { Role } from "../../auth/auth.types";
import { Socket, Server } from 'socket.io';
import envs from "../../../utilities/envs";

const { PORT } = envs;

const io = new Server(PORT, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

export const sendMessageToAdmin = (req: Chat, socket: Socket) => {
    const adminID = io.sockets.sockets.get(req.chatId);

    if (adminID && Role.ADMIN) adminID.emit('recieve_chat_from_admin', req.messages);
}

export const sendMessageToStudent = (req: Chat, socket: Socket) => {
    const studentID = io.sockets.sockets.get(req.chatId);

    if (studentID && Role.STUDENT) studentID.emit('recieve_chat_from_student', req.messages);
}

export const sendMessageToInstructor = (req: Chat, socket: Socket) => {
    const instructorID = io.sockets.sockets.get(req.chatId);

    if (instructorID && Role.INSTRUCTOR) instructorID.emit('recieve_chat_from_instructor', req.messages);
}