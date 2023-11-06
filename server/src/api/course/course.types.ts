export enum CourseType {
    TDC_F2F = 'TDC Face to Face',
    PDC_AUTO_MC = 'PDC Automatic Motorcycle',
    PDC_MANUAL_MC = 'PDC Manual Motorcycle',
    PDC_AUTO_CAR = 'PDC Automatic Car',
    PDC_MANUAL_CAR = 'PDC Manual Car'
}

export interface Course {
    courseId?: string;
    type: CourseType;
}

export type CreateCourse = {
    type: CourseType;
};
