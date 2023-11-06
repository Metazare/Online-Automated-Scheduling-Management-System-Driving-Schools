import { Document } from 'mongoose';

export enum Sex {
    MALE = 'male',
    FEMALE = 'female'
}

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

export type CreateStudent = {
    firstName: string;
    middleName?: string;
    lastName: string;
    suffix?: string;
    address: string;
    contact: string;
    birthday: number;
    sex: Sex;
    email: string;
    password: string;
}
