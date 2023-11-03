import { Enrollment, EnrollmentDocument } from './enrollment.types';
import { id } from '../../utilities/ids';
import { Schema, Types, model } from 'mongoose';

const enrollmentSchema = new Schema(
    {
        enrollmentId: {
            type: String,
            unique: true,
            default: id
        },
        course: {
            type: Types.ObjectId,
            ref: 'Course',
            required: [true, 'Course is required']
        },
        student: {
            type: Types.ObjectId,
            ref: 'Student',
            required: [true, 'Student is required']
        },
        availability: {
            type: {
                days: {
                    type: [
                        {
                            type: Number,
                            min: [0, 'Invalid day'],
                            max: [6, 'Invalid day'],
                        }
                    ],
                    required: [true, 'Avaliable days required']
                },
                time: {
                    type: {
                        start: {
                            type: Number,
                            min: [0, 'Invalid start time'],
                            max: [23, 'Invalid start time'],
                            required: [true, 'Start time is required']
                        },
                        end: {
                            type: Number,
                            min: [0, 'Invalid end time'],
                            max: [23, 'Invalid end time'],
                            required: [true, 'End time is required']
                        }
                    },
                    validate: {
                        validator: function (value: Enrollment['availability']['time']) {
                            if (value.start >= value.end) return false;
                            return true;
                        },
                        message: 'Invalid time'
                    },
                    required: true
                }
            },
            required: true
        },
        reason: String,
        status: {
            type: String,
            enum: {
                values: ['pending', 'accepted', 'declined'],
                message: '"{VALUE}" is not supported'
            },
            default: 'pending'
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (_doc, ret) => {
                const { _id, __v, ...rest } = ret;
                return rest;
            }
        }
    }
);

export default model<EnrollmentDocument>('Enrollment', enrollmentSchema);
