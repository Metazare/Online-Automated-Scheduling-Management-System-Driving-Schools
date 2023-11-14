import { Types } from "mongoose";
import { UserDocument, Role } from "../auth/auth.types";

export interface Chat {
    chatId: string;
    members: {
        user: Types.ObjectId | Record<string, unknown>;
        role: Role
    }[];
    messages: {
        userId: string;
        message: string;
        date: Date
    }[]
}

export interface ChatDocument extends Chat, Document {
    members: {
        user: UserDocument['_id'];
        role: Role
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ChatPopulatedDocument extends ChatDocument {
    members: {
        user: UserDocument;
        role: Role
    }[];
}
