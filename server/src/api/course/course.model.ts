import { Schema, Types, model } from 'mongoose';
import { id } from '../../utilities/ids';
import { CourseDocument } from './course.types';

const courseSchema = new Schema(
    {
        courseId: {
            type: String,
            unique: true,
            default: id
        },
        type: {
            type: String,
            enum: {
                values: [
                    'TDC Face to Face',
                    'PDC Automatic Motorcycle',
                    'PDC Manual Motorcycle',
                    'PDC Automatic Car',
                    'PDC Manual Car'
                ],
                message: '{VALUE} is not supported'
            },
            required: true
        },
        school: {
            type: Types.ObjectId,
            ref: 'School',
            required: true
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

export default model<CourseDocument>('Course', courseSchema);
