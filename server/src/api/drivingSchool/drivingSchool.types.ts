import { Document } from 'mongoose';

export interface DrivingSchool {
    schoolId: string;
    name: string;
    address: string;
    contact: string;
    credentials: {
        email: string;
        password: string;
    };
}

export interface DrivingSchoolDocument extends DrivingSchool, Document {
    createdAt: Date;
    updatedAt: Date;
}
