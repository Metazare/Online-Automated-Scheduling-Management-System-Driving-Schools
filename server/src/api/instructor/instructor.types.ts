import { Document, Types } from 'mongoose';
import { Sex } from '../../@types/types';
import { DrivingSchool, DrivingSchoolDocument } from '../school/school.types';

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
    drivingSchool: Types.ObjectId | Record<string, unknown>;
    status: 'active' | 'inactive';
}

export interface InstructorDocument extends Instructor, Document {
    drivingSchool: DrivingSchoolDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface InstructorPopulatedDocument extends InstructorDocument {
    drivingSchool: DrivingSchool;
}
