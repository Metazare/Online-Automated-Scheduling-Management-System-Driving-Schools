import { SchoolDocument } from '../school/school.types';
export enum Role {
    ADMIN = 'admin',
    STUDENT = 'student',
    INSTRUCTOR = 'instructor'
}

export interface Payload {
    userId: string;
    role: Role;
}

export type UserLogin = {
    email: string;
    password: string;
    role: Role;
};

type BaseRegister = {
    address: string;
    contact: string;
    email: string;
    password: string;
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
    sex: Sex;
};
export type StudentRegister = InstructorRegister & { birthday: Date };

export type AllRegister = SchoolRegister | InstructorRegister | StudentRegister;
