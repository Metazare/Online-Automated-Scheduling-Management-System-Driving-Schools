import { id } from '../../utilities/ids';
import { Notification, NotificationDocument, NotificationStatus } from './notification.types';
import { Role } from '../auth/auth.types';
import { Schema, Types, Unpacked, model } from 'mongoose';

const notificationSchema = new Schema({
    notificationId: {
        type: String,
        unique: true,
        default: id
    },
    targets: [
        {
            user: {
                type: Types.ObjectId,
                refPath: function (this: Unpacked<Notification['targets']>) {
                    switch (this.role) {
                        case Role.ADMIN:
                            return 'School';
                        case Role.INSTRUCTOR:
                            return 'Instructor';
                        case Role.STUDENT:
                            return 'Student';
                    }
                },
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
        required: true
    }
});

export default model<NotificationDocument>('Notification', notificationSchema);
