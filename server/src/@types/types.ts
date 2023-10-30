import { Request } from "express";

export interface BodyRequest<T> extends Request<{}, {}, T> {}
export interface QueryRequest<T> extends Request<{}, {}, {}, T> {}

export enum Sex {
    MALE = 'male',
    FEMALE = 'female'
}

export enum Role {
    ADMIN = 'admin',
    STUDENT = 'student',
    INSTRUCTOR = 'instructor'
}