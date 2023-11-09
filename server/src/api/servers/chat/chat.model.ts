import { Message } from './chat.types';
import { id } from '../../../utilities/ids';
import { model } from 'mongoose';
import { Schema, Types } from 'mongoose';

const chatSystemSchema = new Schema({
    chatId: {
        type: String,
        unique: true,
        default: id
    },
    members: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: {
        type: String,
        required: true
    }
});