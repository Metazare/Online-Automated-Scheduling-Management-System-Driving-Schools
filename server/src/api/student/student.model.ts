import { hashSync } from 'bcrypt';
import { id } from '../../utilities/ids';
import { Schema, model } from 'mongoose';
import { StudentDocument } from './student.types';

const studentSchema = new Schema(
    {
        instructorId: {
            type: String,
            required: [true, 'Instructor ID is required'],
            unique: true,
            default: id
        },
        name: {
            type: {
                first: {
                    type: String,
                    required: [true, 'First name is required']
                },
                middle: String,
                last: {
                    type: String,
                    required: [true, 'Last name is required']
                },
                extension: String
            },
            required: [true, 'Name is required']
        },
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        contact: {
            type: String,
            required: [true, 'Contact is required']
        },
        birthday: {
            type: Date,
            required: [true, 'Birthday is required']
        },
        sex: {
            type: String,
            enum: ['male', 'female'],
            required: [true, 'Sex is required']
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
        toJSON: {
            transform(_doc, ret: Record<string, unknown>) {
                const { credentials, _id, __v, ...rest } = ret;
                return rest;
            }
        }
    }
);

export default model<StudentDocument>('Student', studentSchema);
