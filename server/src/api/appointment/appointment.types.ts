import { Document, Types } from 'mongoose';
import { EnrollmentDocument, EnrollmentPopulatedDocument } from '../enrollment/enrollment.types';
import { InstructorDocument, InstructorPopulatedDocument } from '../instructor/instructor.types';
import { Schedule, SchoolDocument } from '../school/school.types';

/* MODEL */

export interface Appointment {
    appointmentId: string;
    enrollment: Types.ObjectId | Record<string, unknown>;
    instructor: Types.ObjectId | Record<string, unknown>;
    school: Types.ObjectId | Record<string, unknown>;
    vehicle: string;
    date: Date;
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
};

export type ScheduleData = {
    days: string[],
    from: Date,
    to: Date
}

export type CreateAppointment = {
    enrollmentId: string;
    instructorId: string;
    vehicle: string;
    schedule: ScheduleData;
};

export type UpdateAppointment = {
    appointmentId: string;
    schedule: Schedule;
    date: number
};
