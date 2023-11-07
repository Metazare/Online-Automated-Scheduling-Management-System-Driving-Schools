import { Enrollment, EnrollmentDocument, EnrollmentStatus } from './enrollment.types';
import { id } from '../../utilities/ids';
import { Schema, Types, model } from 'mongoose';

const enrollmentSchema = new Schema(
    {
        enrollmentId: {
            type: String,
            unique: true,
            default: id
        },
        school: {
            type: Types.ObjectId,
            ref: 'School',
            required: true
        },
        student: {
            type: Types.ObjectId,
            ref: 'Student',
            required: true
        },
        courseId: {
            type: String,
            required: true
        },
        availability: {
            type: {
                days: {
                    type: [
                        {
                            type: Number,
                            min: [0, 'Invalid day'],
                            max: [6, 'Invalid day']
                        }
                    ],
                    required: true
                },
                time: {
                    type: {
                        start: {
                            type: Number,
                            min: [0, 'Invalid start time'],
                            max: [23, 'Invalid start time'],
                            required: true
                        },
                        end: {
                            type: Number,
                            min: [0, 'Invalid end time'],
                            max: [23, 'Invalid end time'],
                            required: true
                        }
                    },
                    validate: {
                        validator: function ({ start, end }: Enrollment['availability']['time']) {
                            return start < end;
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
                values: Object.values(EnrollmentStatus),
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
                const {
                    _id: id,
                    availability: {
                        days,
                        time: { start, end }
                    },
                    ...rest
                } = ret;

                return {
                    ...rest,
                    availability: {
                        days,
                        time: {
                            start,
                            end
                        }
                    }
                };
            }
        }
    }
);

export default model<EnrollmentDocument>('Enrollment', enrollmentSchema);
