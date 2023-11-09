import { User } from '../notification/notification.types';

export type Message = {
    userId: string;
    message: string;
}

export interface ChatSystem {
    chatId: string;
    target: User[];
    messages: Message[];
}