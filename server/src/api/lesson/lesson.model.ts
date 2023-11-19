import { id } from '../../utilities/ids';
import { LessonDocument, LessonStatus } from './lesson.types';
import { Schema, model } from 'mongoose';

const lessonSchema = new Schema(
    {
        lessonId: {
            type: String,
            unique: true,
            default: id
        },
        courseId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            minLengh: 1,
            required: true
        },
        description: {
            type: String,
            minLength: 1,
            required: true
        },
        status: {
            type: String,
            enum: {
                values: Object.values(LessonStatus),
                message: '"{VALUE}" is not supported'
            }
        },
        feedback: {
          type: String,
        },
        file: String
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (_doc, ret) => {
                const { _id, ...rest } = ret;
                return rest;
            }
        }
    }
);

export default model<LessonDocument>('Lesson', lessonSchema);
