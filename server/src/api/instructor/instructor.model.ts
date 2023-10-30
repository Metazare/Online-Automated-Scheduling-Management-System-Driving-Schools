import { hashSync } from 'bcrypt';
import { id } from '../../utilities/ids';
import { InstructorDocument } from './instructor.types';
import { Schema, Types, model } from 'mongoose';
import { DrivingSchool } from '../drivingSchool/drivingSchool.types';

const instructorSchema = new Schema(
    {
        instructorId: {
            type: String,
            required: [true, 'Instructor ID is required'],
            unique: true,
            default: id
        },
        name: {
            type: {
                first: {
                    type: String,
                    required: [true, 'First name is required']
                },
                middle: String,
                last: {
                    type: String,
                    required: [true, 'Last name is required']
                },
                extension: String
            },
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
        sex: {
            type: String,
            enum: ['male', 'female'],
            required: [true, 'Sex is required']
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
        },
        drivingSchool: {
            type: Types.ObjectId,
            ref: 'DrivingSchool',
            required: [true, 'Driving school is required']
        },
        status: {
            type: String,
            enum: {
                values: ['active', 'inactive'],
                message: '{VALUE} is not a valid status'
            },
            default: 'active'
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform(_doc, ret: Record<string, unknown>) {
                const { credentials, _id, __v, drivingSchool, ...rest } = ret;
                return { ...rest, drivingSchool: (<DrivingSchool>drivingSchool).schoolId };
            }
        }
    }
);

export default model<InstructorDocument>('Instructor', instructorSchema);
