import { AppointmentDocument } from './appointment.types';
import { id } from '../../utilities/ids';
import { model } from 'mongoose';
import { Schema, Types } from 'mongoose';

const appointmentSchema = new Schema(
    {
        appointmentId: {
            type: String,
            unique: true,
            default: id
        },
        enrollment: {
            type: Types.ObjectId,
            ref: 'Enrollment',
            required: true
        },
        instructor: {
            type: Types.ObjectId,
            ref: 'Instructor',
            required: true
        },
        school: {
            type: Types.ObjectId,
            ref: 'School',
            required: true
        },
        vehicle: {
            type: String
        },
        schedule: {
            type: {
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
            },
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (_doc, ret) => {
                const {
                    _id,
                    instructor: { school, ...instructor },
                    ...rest
                } = ret;

                return { ...rest, instructor };
            }
        }
    }
);

export default model<AppointmentDocument>('Appointment', appointmentSchema);
