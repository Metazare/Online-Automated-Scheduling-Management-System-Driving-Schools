import { hashSync } from 'bcrypt';
import { id } from '../../utilities/ids';
import { Schema, model } from 'mongoose';
import { SchoolDocument } from './school.types';

const schoolSchema = new Schema(
    {
        schoolId: {
            type: String,
            unique: true,
            default: id
        },
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        about: {
            type: String,
            required: [true, 'About is required']
        },
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        contact: {
            type: String,
            required: [true, 'Contact is required']
        },
        credentials: {
            type: {
                email: {
                    type: String,
                    required: [true, 'Email is required'],
                    match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                    unique: true
                },
                password: {
                    type: String,
                    required: [true, 'Password is required'],
                    set: (value: string): string => hashSync(value, 10)
                }
            },
            required: [true, 'Admin credentials are required']
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(_doc, ret: Record<string, unknown>) {
                const { credentials, _id, __v, ...rest } = ret;
                return rest;
            }
        }
    }
);

export default model<SchoolDocument>('School', schoolSchema);
