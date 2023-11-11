import { Document } from 'mongoose';

export enum ProgressStatus {
    COMPLETE = 'complete',
    INCOMPLETE = 'incomplete'
}

/* MODEL */

export interface Lesson {
    lessonId: string;
    courseId: string;
    title: string;
    description: string;
    file?: string;
}

export interface LessonDocument extends Lesson, Document {
    createdAt: Date;
    updatedAt: Date;
}

/* REQUEST */

export type GetLessons = {
    courseId?: string;
}

export type CreateLesson = {
    courseId: string;
    title: string;
    description: string;
    file?: string;
};

export type UpdateLesson = {
    lessonId: string;
    title?: string;
    description?: string;
    file?: string;
}

export type DeleteLesson = {
    lessonId: string;
}

export type UpdateProgress = {
    enrollmentId: string;
    lessonId: string;
    status: ProgressStatus;
}

/* OTHER */

export interface ProgressLesson {
    lessonId: string;
    title: string;
    description: string;
    file?: string;
    status?: ProgressStatus;
}