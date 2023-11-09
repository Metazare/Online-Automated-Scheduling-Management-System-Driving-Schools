import { Notification } from './notification.types';
import { id } from '../../../utilities/ids';
import { model } from 'mongoose';
import { Schema, Types } from 'mongoose';

const notificationSchema = new Schema({
    notificationId: {
        type: String,
        unique: true,
        default: id
    },
    target: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['viewed', 'ignored'],
        default: 'ignored'
    }
});

export default model<Notification & Document>('Notification', notificationSchema);
