export interface Chat {
    chatId: string;
    memebers: {
        userId: string;
        role: string;
    }[];
    messages: {
        userId: string;
        message: string;
        date: Date;
    }[];
}