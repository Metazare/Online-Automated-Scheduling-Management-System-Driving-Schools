import { Course } from '../course/course.types';
import { Document } from 'mongoose';

/* MODEL */

export interface School {
    schoolId: string;
    name: string;
    about: string;
    address: string;
    contact: string;
    courses: Course[];
    profile: string;
    credentials: {
        email: string;
        password: string;
    };
}

export interface SchoolDocument extends School, Document {
    createdAt: Date;
    updatedAt: Date;
}

/* REQUEST */

export type GetSchools = {
    schoolId?: string;
};

export type CreateSchool = {
    name: string;
    about: string;
    address: string;
    contact: string;
    email: string;
    password: string;
    profile: string;
};
