import { Document } from 'mongoose';
import { Enrollment } from '../enrollment/enrollment.types';

export enum Sex {
    MALE = 'male',
    FEMALE = 'female'
}

/* MODEL */

export interface Student {
    studentId: string;
    name: {
        first: string;
        middle?: string;
        last: string;
        suffix?: string;
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

/* REQUEST */

export type GetStudents = {
    studentId?: string;
    courseType?: string;
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

/* OTHER */

export type StudentsList = Student & { enrollments: Omit<Enrollment, 'school' | 'student'>[] };
