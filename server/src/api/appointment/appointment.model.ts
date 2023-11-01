import { AppointmentDocument } from "./appointment.types";
import { id } from "../../utilities/ids";
import { model } from "mongoose";
import { Schema, Types } from "mongoose";

const appointmentSchema = new Schema({
    appointmentId: {
        type: String,
        unique: true,
        default: id
    },
    student: {
        type: Types.ObjectId,
        ref: 'Student',
        requyed: [true, 'Student is required']
    },
    instructor: {
        type: Types.ObjectId,
        ref: 'Instructor',
        required: [true, 'Instructor is required']
    },
    vehicle: {
        type: String,
        required: [true, 'Vehicle is required']
    },
    schedule: {
        type: Date,
        required: [true, 'Schedule is required']
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'accepted', 'reschedule'],
            message: '"{VALUE}" is not supported'
        }
    }
});

export default model<AppointmentDocument>('Appointment', appointmentSchema);