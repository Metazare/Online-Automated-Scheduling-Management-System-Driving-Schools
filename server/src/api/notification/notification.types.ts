import { Document, Types } from "mongoose";
import { Role, UserDocument } from "../auth/auth.types";

export enum NotificationStatus {
    VIEWED = 'viewed',
    IGNORED = 'ignored'
}

export interface Notification {
    notificationId: string;
    targets: {
        user: Types.ObjectId | Record<string, unknown>;
        role: Role;
    }[];
    content: string;
    status: NotificationStatus;
}

export interface NotificationDocument extends Notification, Document {
    targets: {
        user: UserDocument['_id'];
        role: Role;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export interface NotificationPopulatedDocument extends NotificationDocument {
    targets: {
        user: UserDocument;
        role: Role;
    }[];
}