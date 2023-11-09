import { Role } from '../../auth/auth.types';

export interface User {
    userId: string;
    role: Role;
};

export interface Notification {
    notificationId: string;
    target: User[];
    content: string;
    status: 'viewed' | 'ignored';
}
