import { Notification } from './notification.types';
import { Role } from '../../auth/auth.types';
import { id } from '../../../utilities/ids';
import { model } from 'mongoose';
import { Schema, Types } from 'mongoose';
import { NotificationStatus } from './notification.types';

const notificationSchema = new Schema({
    notificationId: {
        type: String,
        unique: true,
        required: true,
        default: id
    },
    target: [
        {
            userId: {
                type: String,
                required: true
            },
            role: {
                type: String,
                enum: {
                    values: Object.values(Role),
                    message: '"{VALUE}" us bit supported'
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
            message: '"{VALUE}" us bit supported'
        }
    }
},
    { timestamps: true, versionKey: false }
);

export default model<Notification>('Notification', notificationSchema);
