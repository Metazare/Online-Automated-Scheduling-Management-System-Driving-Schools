import { Document, Types } from 'mongoose';
import { School, SchoolDocument } from '../school/school.types';
import { Sex } from '../student/student.types';

export enum InstructorStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export interface Instructor {
    instructorId: string;
    name: {
        first: string;
        middle?: string;
        last: string;
        extension?: string;
    };
    address: string;
    contact: string;
    sex: Sex;
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
