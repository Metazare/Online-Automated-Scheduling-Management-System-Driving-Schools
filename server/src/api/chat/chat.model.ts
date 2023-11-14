import { ChatDocument } from './chat.types';
import { id } from '../../utilities/ids';
import { Role } from '../auth/auth.types';
import { Schema, model } from 'mongoose';

const chatSchema = new Schema(
    {
        chatId: {
            type: String,
            unique: true,
            default: id
        },
        members: [
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
        messages: [
            {
                user: {
                    type: String,
                    required: true
                },
                message: {
                    type: String,
                    minLength: 1,
                    required: true
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (_doc, ret) => {
                const { chatId, members, messages } = ret;
                return {
                    chatId,
                    members: (<Record<string, unknown>[]>members).map(({ _id, ...rest }) => rest),
                    messages: (<Record<string, unknown>[]>messages).map(({ _id, ...rest }) => rest)
                };
            }
        }
    }
);

export default model<ChatDocument>('Chat', chatSchema);
