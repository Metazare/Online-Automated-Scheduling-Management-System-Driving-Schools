import { EnrollmentDocument, EnrollmentStatus } from './enrollment.types';
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
                    schedule: { _id, ...schedule },
                    progress,
                    ...rest
                } = ret;

                return {
                    ...rest,
                    schedule,
                    progress: (<Record<string, unknown>[]>progress).map(({ _id, ...rest }) => rest)
                };
            }
        }
    }
);

export default model<EnrollmentDocument>('Enrollment', enrollmentSchema);
