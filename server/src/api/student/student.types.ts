import { Document } from 'mongoose';
import { Sex } from '../../@types/types';

export interface Student {
    studentId: string;
    name: {
        first: string;
        middle?: string;
        last: string;
        extension?: string;
    };
    address: string;
    contact: string;
    birthday: Date;
    sex: Sex;
    credentials: {
        email: string;
        password: string;
    };
}

export interface StudentDocument extends Student, Document {
    createdAt: Date;
    updatedAt: Date;
}
