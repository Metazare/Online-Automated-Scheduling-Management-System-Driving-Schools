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
                days: {
                    type: [String],
                },
                from: {
                    type: Date,
                },
                to: {
                    type: Date
                }
            }
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
