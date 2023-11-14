import { Role, SocketUser } from '../auth/auth.types';

export interface Chat {
    chatId: string;
    members: {
        user: string;
        role: Role;
    }[];
    messages: {
        user: string;
        message: string;
        date: Date;
    }[];
}

export interface ChatDocument extends Chat, Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateMessage {
    sender: SocketUser;
    receiver: SocketUser;
    message: string;
}
