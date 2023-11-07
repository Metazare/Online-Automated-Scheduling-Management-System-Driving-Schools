import { CourseType } from "../course/course.types";
import { Document, Types } from "mongoose";
import { ProgressLesson } from "../lesson/lessont.types";
import { SchoolDocument } from "../school/school.types";
import { Student, StudentDocument } from "../student/student.types";

export enum EnrollmentStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    FINISHED = 'finished'
}

/* MODEL */

export interface Enrollment {
    enrollmentId: string;
    school: Types.ObjectId | Record<string, unknown>;
    student: Types.ObjectId | Record<string, unknown>;
    courseId: string;
    availability: {
        days: number[];
        time: {
            start: number;
            end: number;
        };
    };
    progress: ProgressLesson[];
    reason?: string;
    status: EnrollmentStatus;
}

export interface EnrollmentDocument extends Enrollment, Document {
    school: SchoolDocument['_id'];
    student: StudentDocument['_id'];
    createdAt: Date;
    updatedAt: Date;
}

export interface EnrollmentPopulatedDocument extends EnrollmentDocument {
    school: SchoolDocument;
    student: Student;
}

/* REQUEST */

export type GetEnrollment = {
    enrollmentId?: string;
    courseId?: string;
    courseType?: CourseType;
    status?: EnrollmentStatus;
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