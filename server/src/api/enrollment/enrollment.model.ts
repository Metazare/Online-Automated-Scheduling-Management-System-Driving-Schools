import { Enrollment, EnrollmentDocument, EnrollmentStatus } from './enrollment.types';
import { id } from '../../utilities/ids';
import { ProgressStatus } from '../lesson/lesson.types';
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
        progress: [
            {
                lesson: {
                    type: Types.ObjectId,
                    ref: 'Lesson',
                    required: true
                },
                status: {
                    type: String,
                    enum: {
                        values: Object.values(ProgressStatus),
                        message: '"{VALUE}" is not supported'
                    },
                    default: ProgressStatus.INCOMPLETE
                },
                feedback: {
                  type: String
              }
            }
        ],
        reason: String,
        status: {
            type: String,
            enum: {
                values: Object.values(EnrollmentStatus),
                message: '"{VALUE}" is not supported'
            },
            default: EnrollmentStatus.PENDING
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
                    progress,
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
                    },
                    progress: (<Record<string, unknown>[]>progress).map(({ _id, ...rest }) => rest)
                };
            }
        }
    }
);

export default model<EnrollmentDocument>('Enrollment', enrollmentSchema);
