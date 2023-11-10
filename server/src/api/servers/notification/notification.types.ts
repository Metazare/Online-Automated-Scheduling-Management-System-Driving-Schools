export enum NotificationStatus {
    VIEWED = 'viewed',
    IGNORED = 'ignored'
}

export enum NotificationTitle {
    ENROLLMENT = 'recieved_enrollment',
    RESCHEDULE = 'recieved_reschedule',
    APPROVAL = 'recieved_approval',
    NEW_APPOINTMENT = 'recieved_new_appointment',
}

export interface Notification {
    notificationId: string;
    target: {
        userId: string;
        role: string;
    };
    content: string;
    status: NotificationStatus;
}

export interface SendSchedule extends Notification {
    studentId: string;
    date: Date;
    courseId: string;
    schoolId: string;
}