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
import { LessonDocument, ProgressLesson } from '../lesson/lessont.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
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
        .populate('school student')
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

    const { courseId, days, startTime, endTime } = req.body;
    const checker = new CheckData();

    checker.checkType(courseId, 'string', 'courseId');
    checker.checkArray(days, 'number', 'days');
    checker.checkType(startTime, 'number', 'startTime');
    checker.checkType(endTime, 'number', 'endTime');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const school = await SchoolModel.findOne({ 'courses.courseId': courseId }).exec();
    if (!school) throw new NotFound('Course');

    await EnrollmentModel.create({
        school: school._id,
        student: user._id,
        courseId,
        availability: {
            days: [...new Set(days)],
            time: {
                start: startTime,
                end: endTime
            }
        }
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

    if (status === EnrollmentStatus.DECLINED) {
        const { reason } = req.body;

        checker.checkType(reason, 'string', 'reason');
        if (checker.size()) throw new UnprocessableEntity(checker.errors);

        enrollment.reason = reason;
    }

    if (status === EnrollmentStatus.ACCEPTED) {
        const lessons: LessonDocument[] = await LessonModel.find({ courseId: enrollment.courseId }).exec();
        enrollment.progress = lessons.reduce((acc, lesson) => [...acc, <ProgressLesson>lesson], <ProgressLesson[]>[]);
    }

    enrollment.status = status;
    await enrollment.save();

    res.sendStatus(204);
};
