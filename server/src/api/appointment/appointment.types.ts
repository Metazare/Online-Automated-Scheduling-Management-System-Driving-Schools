import { Document, Types } from 'mongoose';
import { EnrollmentDocument, EnrollmentPopulatedDocument } from '../enrollment/enrollment.types';
import { InstructorDocument, InstructorPopulatedDocument } from '../instructor/instructor.types';
import { SchoolDocument } from '../school/school.types';

export enum AppointmentStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    RESCHEDULE = 'reschedule'
}

/* MODEL */

export interface Appointment {
    appointmentId: string;
    enrollment: Types.ObjectId | Record<string, unknown>;
    instructor: Types.ObjectId | Record<string, unknown>;
    school: Types.ObjectId | Record<string, unknown>;
    vehicle: string;
    schedule: Date;
    status: AppointmentStatus;
}

export interface AppointmentDocument extends Appointment, Document {
    enrollment: EnrollmentDocument['_id'];
    instructor: InstructorDocument['_id'];
    school: SchoolDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface AppointmentPopulatedDocument extends AppointmentDocument {
    enrollment: EnrollmentPopulatedDocument;
    instructor: InstructorPopulatedDocument;
    school: SchoolDocument;
}

/* REQUEST */

export type GetAppointments = {
    appointmentId?: string;
    instructorId?: string;
    enrollmentId?: string;
    status?: AppointmentStatus;
};

export type CreateAppointment = {
    enrollmentId: string;
    instructorId: string;
    vehicle: string;
    schedule: number;
};

export type UpdateAppointment = {
    appointmentId: string;
    status?: AppointmentStatus;
    schedule?: number;
};
