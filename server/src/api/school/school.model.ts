import { hashSync } from 'bcrypt';
import { id } from '../../utilities/ids';
import { Schema, model } from 'mongoose';
import { SchoolDocument } from './school.types';
import { CourseType } from '../course/course.types';

const schoolSchema = new Schema(
    {
        schoolId: {
            type: String,
            unique: true,
            default: id
        },
        name: {
            type: String,
            minlength: 1,
            required: true
        },
        about: {
            type: String,
            minLength: 1,
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
        profile: {
            type: String
        },
        courses: [
            {
                courseId: {
                    type: String,
                    index: { unique: true, sparse: true },
                    default: id
                },
                type: {
                    type: String,
                    enum: {
                        values: Object.values(CourseType),
                        message: '"{VALUE}" is not supported'
                    },
                    required: true
                }
            }
        ],
        schedules: [
            {
                name: {
                    type: String,
                    required: true
                },
                from: {
                    type: Number,
                    required: true
                },
                to: {
                    type: Number,
                    required: true
                }
            }
        ],
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
                    courses,
                    schedules,
                    credentials: { email },
                    ...rest
                } = ret as SchoolDocument;
                return {
                    ...rest,
                    email,
                    courses: courses.map(({ courseId, type }) => ({ courseId, type })),
                    schedules: schedules.map(({ name, from, to }) => ({ name, from, to }))
                };
            }
        }
    }
);

export default model<SchoolDocument>('School', schoolSchema);
