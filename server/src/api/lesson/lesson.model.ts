import { id } from '../../utilities/ids';
import { LessonDocument } from './lessont.types';
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
