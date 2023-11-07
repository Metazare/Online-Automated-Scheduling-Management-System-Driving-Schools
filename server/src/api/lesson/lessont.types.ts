
export enum ProgressStatus {
    COMPLETE = 'complete',
    INCOMPLETE = 'incomplete'
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
