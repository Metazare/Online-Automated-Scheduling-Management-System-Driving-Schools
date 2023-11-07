import { hashSync } from 'bcrypt';
import { id } from '../../utilities/ids';
import { InstructorDocument, InstructorStatus } from './instructor.types';
import { Schema, Types, model } from 'mongoose';

const instructorSchema = new Schema(
    {
        instructorId: {
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
                middle: {
                    type: String,
                    minlength: 1
                },
                last: {
                    type: String,
                    minLength: 1,
                    required: true
                },
                suffix: {
                    type: String,
                    minlength: 1
                }
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
        credentials: {
            type: {
                email: {
                    type: String,
                    required: true,
                    match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                    unique: true
                },
                password: {
                    type: String,
                    required: true,
                    set: (value: string): string => hashSync(value, 10)
                }
            },
            required: true
        },
        school: {
            type: Types.ObjectId,
            ref: 'School',
            required: true
        },
        status: {
            type: String,
            enum: {
                values: Object.values(InstructorStatus),
                message: '"{VALUE}" is not a valid status'
            },
            default: 'active'
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(_doc, ret) {
                const {
                    _id,
                    credentials,
                    name: { first, middle, last, suffix },
                    ...rest
                } = ret;

                return {
                    ...rest,
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

export default model<InstructorDocument>('Instructor', instructorSchema);
