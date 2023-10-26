export type FullName = {
    first: string;
    middle?: string;
    last: string;
    extension?: string;
};

export enum Sex {
    MALE = 'male',
    FEMALE = 'female'
}

export enum Role {
    ADMIN = 'admin',
    STUDENT = 'student',
    INSTRUCTOR = 'instructor'
}

/* BASE USER */

export interface BaseUser {
    userId: string;
    name: string | FullName;
    contact: string;
    credentials: {
        email: string;
        password: string;
    };
    role: Role;
}

export interface User extends BaseUser {
    sex?: Sex;
    birthday?: Date;
}

export interface UserDocument extends User, Document {
    createdAt: Date;
    updatedAt: Date;
}

/* DRIVING SCHOOL */

export interface DrivingSchool extends BaseUser {
    name: string;
}

export interface DrivingSchoolDocument extends DrivingSchool, Document {
    createdAt: Date;
    updatedAt: Date;
}

/* INSTRUCTOR */

export interface Instructor extends BaseUser {
    name: FullName;
    sex: Sex;
}

export interface InstructorDocument extends Instructor, Document {
    createdAt: Date;
    updatedAt: Date;
}

/* STUDENT */

export interface Student extends Instructor {
    birthday: Date;
}

export interface StudentDocument extends Student, Document {
    createdAt: Date;
    updatedAt: Date;
}

// ================================================================================================================== //

export type GetUser = {
    userId?: string
}
