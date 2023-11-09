import { Role } from "../../auth/auth.types";
import { Socket, Server } from 'socket.io';

const io = new Server(3001, {
    cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io']
    }
});

