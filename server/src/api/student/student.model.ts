import { hashSync } from 'bcrypt';
import { id } from '../../utilities/ids';
import { Schema, model } from 'mongoose';
import { Sex, StudentDocument } from './student.types';

const studentSchema = new Schema(
    {
        studentId: {
            type: String,
            unique: true,
            default: id
        },
        name: {
            type: {
                first: {
                    type: String,
                    minLength: 1,
                    required: true
                },
                middle: String,
                last: {
                    type: String,
                    minLength: 1,
                    required: true
                },
                suffix: String
            },
            required: true
        },
        address: {
            type: String,
            minLength: 1,
            required: true
        },
        contact: {
            type: String,
            minLength: 1,
            required: true
        },
        birthday: {
            type: Date,
            required: true
        },
        sex: {
            type: String,
            enum: {
                values: Object.values(Sex),
                message: '"{VALUE}" is not supported'
            },
            required: true
        },
        profile:{
          type: String,
        },
        credentials: {
            type: {
                email: {
                    type: String,
                    unique: true,
                    match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                    required: true
                },
                password: {
                    type: String,
                    set: (value: string): string => hashSync(value, 10),
                    required: true
                }
            },
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(_doc, ret) {
                const {
                    _id,
                    credentials: { email },
                    name: { first, middle, last, suffix },
                    ...rest
                } = ret;

                return {
                    ...rest,
                    email,
                    name: {
                        first,
                        middle,
                        last,
                        suffix
                    }
                };
            }
        }
    }
);

export default model<StudentDocument>('Student', studentSchema);
