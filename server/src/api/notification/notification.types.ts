import { Role, SocketUser } from '../auth/auth.types';
import { Document } from 'mongoose';

export enum NotificationStatus {
    READ = 'read',
    UNREAD = 'unread',
}

export interface Notification {
    notificationId: string;
    targets: {
        user: string;
        role: Role;
    }[];
    content: string;
    status: NotificationStatus;
}

export interface NotificationDocument extends Notification, Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateNotification {
    sender: SocketUser;
    targets: SocketUser[];
    content: string;
}

export interface ReadNotification {
    notificationId: string;
}