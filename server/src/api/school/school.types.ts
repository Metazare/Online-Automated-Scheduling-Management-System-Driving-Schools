import { Document } from 'mongoose';
import { Course } from '../course/course.types';

/* MODEL */

export interface School {
    schoolId: string;
    name: string;
    about: string;
    address: string;
    contact: string;
    courses: Course[];
    credentials: {
        email: string;
        password: string;
    };
}

export interface SchoolDocument extends School, Document {
    createdAt: Date;
    updatedAt: Date;
}

export type CreateSchool = {
    name: string;
    about: string;
    address: string;
    contact: string;
    email: string;
    password: string;
};
