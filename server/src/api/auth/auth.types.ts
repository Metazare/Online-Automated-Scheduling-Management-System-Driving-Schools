import { InstructorDocument } from '../instructor/instructor.types';
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

export type AllUserDocument = SchoolDocument | InstructorDocument | StudentDocument;

export interface User {
    document: AllUserDocument;
    role: Role;
}

export type UserLogin = {
    email: string;
    password: string;
};

export type UserRegister = (CreateSchool | CreateStudent) & { role: Role };
