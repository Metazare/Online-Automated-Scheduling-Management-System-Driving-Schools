import { Role, User } from '../auth/auth.types';

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
    sender: User;
    receiver: User;
    message: string;
}
