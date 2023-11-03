import { Document, Types } from 'mongoose';
import { School, SchoolDocument } from '../school/school.types';

export enum CourseType {
    TDC_F2F = 'TDC Face to Face',
    PDC_AUTO_MC = 'PDC Automatic Motorcycle',
    PDC_MANUAL_MC = 'PDC Manual Motorcycle',
    PDC_AUTO_CAR = 'PDC Automatic Car',
    PDC_MANUAL_CAR = 'PDC Manual Car'
}

export interface Course {
    courseId: string;
    type: CourseType;
    school: Types.ObjectId | Record<string, unknown>;
}

export interface CourseDocument extends Course, Document {
    school: SchoolDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface CoursePopulutadDocument extends CourseDocument {
    school: School;
}

export type CreateCourse = {
    type: CourseType;
}