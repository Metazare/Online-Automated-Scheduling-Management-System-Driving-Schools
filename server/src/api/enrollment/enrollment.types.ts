import { CourseType } from '../course/course.types';
import { Document, Types } from 'mongoose';
import { LessonDocument, ProgressStatus } from '../lesson/lesson.types';
import { Schedule, SchoolDocument } from '../school/school.types';
import { Student, StudentDocument } from '../student/student.types';

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
    schedule: Schedule;
    progress: {
        lesson: Types.ObjectId | Record<string, unknown>;
        status: ProgressStatus;
    }[];
    reason?: string;
    status: EnrollmentStatus;
}

export interface EnrollmentDocument extends Enrollment, Document {
    school: SchoolDocument['_id'];
    student: StudentDocument['_id'];
    progress: {
        lesson: LessonDocument['_id'];
        status: ProgressStatus;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export interface EnrollmentPopulatedDocument extends EnrollmentDocument {
    school: SchoolDocument;
    student: Student;
    progress: {
        feedback?: string;
        lesson: LessonDocument;
        status: ProgressStatus;
    }[];
}

/* REQUEST */

export type GetEnrollment = {
    enrollmentId?: string;
    courseId?: string;
    courseType?: CourseType;
    status?: EnrollmentStatus;
};

export type CreateEnrollment = {
    courseId: string;
};

export type UpdateEnrollmentStatus = {
    enrollmentId: string;
    status: EnrollmentStatus;
    reason?: string;
};
