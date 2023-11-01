import { Document } from 'mongoose';

export interface School {
    schoolId: string;
    name: string;
    about: string;
    address: string;
    contact: string;
    credentials: {
        email: string;
        password: string;
    };
}

export interface SchoolDocument extends School, Document {
    createdAt: Date;
    updatedAt: Date;
}
