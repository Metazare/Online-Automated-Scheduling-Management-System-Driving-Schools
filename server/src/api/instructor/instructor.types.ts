import { Document, Types } from 'mongoose';
import { School, SchoolDocument } from '../school/school.types';

export enum InstructorStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

/* MODEL */

export interface Instructor {
    instructorId: string;
    name: {
        first: string;
        middle?: string;
        last: string;
        suffix?: string;
    };
    address: string;
    contact: string;
    profile: string;
    credentials: {
        email: string;
        password: string;
    };
    school: Types.ObjectId | Record<string, unknown>;
    status: InstructorStatus;
}

export interface InstructorDocument extends Instructor, Document {
    school: SchoolDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface InstructorPopulatedDocument extends InstructorDocument {
    school: School;
}

/* REQUEST */

export type CreateInstructor = {
    firstName: string;
    middleName?: string;
    lastName: string;
    suffix?: string;
    address: string;
    contact: string;
    profile: string;
    email: string;
}

export type GetInstructors = {
    instructorId?: string;
    status?: InstructorStatus;
}

export type UpdateInstructorStatus = {
    instructorId: string;
    status: InstructorStatus;
}

export type UpdateInstructor = {
  instructorId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  address: string;
  contact: string;
  profile: string;
  email: string;
}
