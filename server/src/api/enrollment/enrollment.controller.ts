import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { Course } from '../course/course.types';
import {
    CreateEnrollment,
    EnrollmentPopulatedDocument,
    EnrollmentStatus,
    GetEnrollment,
    UpdateEnrollmentStatus
} from './enrollment.types';
import { LessonDocument, ProgressStatus } from '../lesson/lesson.types';
import { Conflict, NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { Role } from '../auth/auth.types';
import { SchoolDocument } from '../school/school.types';
import { StudentDocument } from '../student/student.types';
import EnrollmentModel from './enrollment.model';
import LessonModel from '../lesson/lesson.model';
import SchoolModel from '../school/school.model';

export const getEnrollments: RequestHandler = async (req: QueryRequest<GetEnrollment>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user, role } = req.user;

    const { enrollmentId, courseId, status, courseType } = req.query;

    const enrollmentQuery: Record<string, unknown> = {};
    if (typeof enrollmentId === 'string') enrollmentQuery.enrollmentId = enrollmentId;
    if (typeof courseId === 'string') enrollmentQuery.courseId = courseId;
    if (typeof status === 'string') enrollmentQuery.status = status;

    if (role === Role.STUDENT) enrollmentQuery.student = user._id;
    if (role === Role.ADMIN) enrollmentQuery.school = user._id;

    let enrollments: EnrollmentPopulatedDocument[] = await EnrollmentModel.find(enrollmentQuery)
        .populate('school student progress.lesson')
        .exec();

    if (typeof courseType === 'string') {
        const courses: Course[] = enrollments.reduce(
            (list, enrollment) => [...list, ...enrollment.school.courses],
            <Course[]>[]
        );

        enrollments = enrollments.filter(
            ({ courseId }) => courses.find((c) => c.courseId === courseId)?.type === courseType
        );
    }

    res.json(enrollments);
};

export const createEnrollment: RequestHandler = async (req: BodyRequest<CreateEnrollment>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = <StudentDocument>req.user.document;

    const { courseId, schedule } = req.body;
    const checker = new CheckData();

    checker.checkType(courseId, 'string', 'courseId');
    checker.checkType(schedule, 'object', 'schedule');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    checker.checkType(schedule.name, 'string', 'schedule.name');
    checker.checkType(schedule.from, 'number', 'schedule.from');
    checker.checkType(schedule.to, 'number', 'schedule.to');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const school = await SchoolModel.findOne({ 'courses.courseId': courseId }).exec();
    if (!school) throw new NotFound('Course');

    const activeEnrollment = await EnrollmentModel.findOne({
        school: school._id,
        student: user._id,
        status: EnrollmentStatus.ACCEPTED
    });
    if (activeEnrollment) throw new Conflict('Student has an active enrollment');

    await EnrollmentModel.create({
        school: school._id,
        student: user._id,
        courseId,
        schedule
    });

    res.sendStatus(201);
};

export const updateEnrollmentStatus: RequestHandler = async (req: BodyRequest<UpdateEnrollmentStatus>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = <SchoolDocument>req.user.document;

    const { enrollmentId, status } = req.body;
    const checker = new CheckData();

    checker.checkType(enrollmentId, 'string', 'enrollmentId');
    checker.checkType(status, 'string', 'status');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const enrollment = await EnrollmentModel.findOne({
        enrollmentId,
        school: user._id,
        status: status === EnrollmentStatus.FINISHED ? EnrollmentStatus.ACCEPTED : EnrollmentStatus.PENDING
    }).exec();
    if (!enrollment) throw new NotFound('Enrollment');

    // Check if the student has any active enrollment
    const activeEnrollment = await EnrollmentModel.findOne({
        student: user._id,
        status: EnrollmentStatus.ACCEPTED
    }).exec();
    if (activeEnrollment) throw new Conflict('Student has an active enrollment');

    if (status === EnrollmentStatus.DECLINED) {
        const { reason } = req.body;

        checker.checkType(reason, 'string', 'reason');
        if (checker.size()) throw new UnprocessableEntity(checker.errors);

        enrollment.reason = reason;
    }

    if (status === EnrollmentStatus.ACCEPTED) {
        const lessons: LessonDocument[] = await LessonModel.find({ courseId: enrollment.courseId }).exec();
        enrollment.progress = lessons.map((lesson) => ({ lesson: lesson._id, status: ProgressStatus.INCOMPLETE }));
    }

    enrollment.status = status;
    await enrollment.save();

    res.sendStatus(204);
};
