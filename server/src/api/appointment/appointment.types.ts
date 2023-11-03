import { Document, Types } from 'mongoose';
import { InstructorDocument, InstructorPopulatedDocument } from '../instructor/instructor.types';
import { Student, StudentDocument } from '../student/student.types';

export enum AppointmentStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    RESCHEDULE = 'reschedule'
}

export interface Appointment {
    appointmentId: string;
    student: Types.ObjectId | Record<string, unknown>;
    instructor: Types.ObjectId | Record<string, unknown>;
    vehicle: string;
    schedule: Date;
    status: AppointmentStatus;
}

export interface AppointmentDocument extends Appointment, Document {
    student: StudentDocument['_id'];
    instructor: InstructorDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface AppointmentPopulatedDocument extends AppointmentDocument {
    student: Student;
    instructor: InstructorPopulatedDocument;
}

export type GetAppointments = {
    appointmentId?: string;
    studentId?: string;
    instructorId?: string;
    status?: AppointmentStatus;
}

export type CreateAppointment = {
    studentId: string;
    instructorId: string;
    vehicle: string;
    schedule: string;
}

export type UpdateAppointment = {
    appointmentId: string;
    status?: AppointmentStatus;
    schedule?: string;
}
