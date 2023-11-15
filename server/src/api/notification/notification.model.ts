import { id } from '../../utilities/ids';
import { NotificationDocument, NotificationStatus } from './notification.types';
import { Role } from '../auth/auth.types';
import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
    notificationId: {
        type: String,
        unique: true,
        default: id
    },
    targets: [
        {
            user: {
                type: String,
                required: true
            },
            role: {
                type: String,
                enum: {
                    values: Object.values(Role),
                    message: '"{VALUE} is not supported"'
                },
                required: true
            }
        }
    ],
    content: {
        type: String,
        minLength: 1,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: Object.values(NotificationStatus),
            message: '"{VALUE} is not supported"'
        },
        default: NotificationStatus.UNREAD
    }
});

export default model<NotificationDocument>('Notification', notificationSchema);
