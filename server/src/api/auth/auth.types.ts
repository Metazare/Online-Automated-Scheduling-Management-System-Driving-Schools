import { InstructorPopulatedDocument } from '../instructor/instructor.types';
import { CreateSchool, SchoolDocument } from '../school/school.types';
import { CreateStudent, StudentDocument } from '../student/student.types';

export enum Role {
    ADMIN = 'admin',
    STUDENT = 'student',
    INSTRUCTOR = 'instructor'
}

export interface Payload {
    userId: string;
    role: Role;
}

export type UserDocument = SchoolDocument | InstructorPopulatedDocument | StudentDocument;

export interface User {
    document: UserDocument;
    role: Role;
}

export interface User {
    userId: string;
    role: Role;
}

export type UserLogin = {
    email: string;
    password: string;
};

export type UserRegister = (CreateSchool | CreateStudent) & { role: Role };
