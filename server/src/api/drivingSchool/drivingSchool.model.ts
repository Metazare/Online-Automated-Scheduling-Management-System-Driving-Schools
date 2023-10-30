import { DrivingSchoolDocument } from './drivingSchool.types';
import { hashSync } from 'bcrypt';
import { id } from '../../utilities/ids';
import { Schema, model } from 'mongoose';

const drivingSchoolSchema = new Schema(
    {
        schoolId: {
            type: String,
            required: [true, 'School ID is required'],
            unique: true,
            default: id
        },
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        contact: {
            type: String,
            required: [true, 'Contact is required']
        },
        credentials: {
            type: {
                email: {
                    type: String,
                    required: [true, 'Email is required'],
                    match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                    unique: true
                },
                password: {
                    type: String,
                    required: [true, 'Password is required'],
                    set: (value: string): string => hashSync(value, 10)
                }
            },
            required: [true, 'Admin credentials are required']
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform(_doc, ret: Record<string, unknown>) {
                const { credentials, _id, __v, ...rest } = ret;
                return rest;
            }
        }
    }
);

export default model<DrivingSchoolDocument>('DrivingSchool', drivingSchoolSchema);
