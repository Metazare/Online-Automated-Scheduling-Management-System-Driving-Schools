import { InstructorDocument } from '../instructor/instructor.types';
import { SchoolDocument } from '../school/school.types';
import { Sex, StudentDocument } from '../student/student.types';

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

type BaseRegister = {
    address: string;
    contact: string;
    email: string;
    role: Role;
};

export type SchoolRegister = BaseRegister & {
    name: string;
    about: string;
    password: string;
};

export type InstructorRegister = BaseRegister & {
    firstName: string;
    middleName?: string;
    lastName: string;
    extensionName?: string;
};

export type StudentRegister = InstructorRegister & {
    birthday: Date;
    sex: Sex;
    password: string;
};

export type AllRegister = SchoolRegister | InstructorRegister | StudentRegister;
