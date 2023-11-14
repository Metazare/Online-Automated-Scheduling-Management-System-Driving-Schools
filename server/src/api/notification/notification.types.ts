import { Role, User } from '../auth/auth.types';
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

export interface NotificationUser {
    userId: string;
    role: Role;
}

export interface CreateNotification {
    sender: User;
    targets: User[];
    content: string;
}

export interface ReadNotification {
    notificationId: string;
}