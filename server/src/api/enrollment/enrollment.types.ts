import { Document, Types } from "mongoose";
import { CourseDocument, CoursePopulutadDocument, CourseType } from "../course/course.types";
import { Student, StudentDocument } from "../student/student.types";

export enum EnrollmentStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    FINISHED = 'finished'
}

export interface Enrollment {
    enrollmentId: string;
    course: Types.ObjectId | Record<string, unknown>;
    student: Types.ObjectId | Record<string, unknown>;
    availability: {
        days: number[];
        time: {
            start: number;
            end: number;
        };
    };
    reason?: string;
    status: EnrollmentStatus;
}

export interface EnrollmentDocument extends Enrollment, Document {
    course: CourseDocument['_id'];
    student: StudentDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface EnrollmentPopulatedDocument extends EnrollmentDocument {
    course: CoursePopulutadDocument;
    student: Student;
}

export type GetEnrollment = {
    enrollmentId?: string;
    courseId?: string;
    status?: EnrollmentStatus;
    courseType?: CourseType;
}

export type CreateEnrollment = {
    courseId: string;
    days: number[];
    startTime: number;
    endTime: number;
}

export type UpdateEnrollmentStatus = {
    enrollmentId: string;
    status: EnrollmentStatus;
    reason?: string;
}