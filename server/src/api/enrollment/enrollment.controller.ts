import { BodyRequest, RequestHandler } from 'express';
import { CourseDocument } from '../course/course.types';
import {
    CreateEnrollment,
    EnrollmentPopulatedDocument,
    EnrollmentStatus,
    UpdateEnrollmentStatus
} from './enrollment.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { SchoolDocument } from '../school/school.types';
import { StudentDocument } from '../student/student.types';
import CourseModel from '../course/course.model';
import EnrollmentModel from './enrollment.model';

export const createEnrollment: RequestHandler = async (req: BodyRequest<CreateEnrollment>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = <StudentDocument>req.user.document;

    const { courseId, days, startTime, endTime } = req.body;

    // prettier-ignore
    if (
        !(days instanceof Array) ||
        days.length === 0 ||
        days.some((day) => typeof day !== 'number' || day < 0 || day > 6)
    ) throw new UnprocessableEntity();

    const course: CourseDocument | null = await CourseModel.findOne({ courseId }).exec();
    if (!course) throw new NotFound('Course not found');

    await EnrollmentModel.create({
        course: course._id,
        student: user._id,
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
    if (typeof enrollmentId !== 'string' || typeof status !== 'string') throw new UnprocessableEntity();

    const enrollment: EnrollmentPopulatedDocument | null = await EnrollmentModel.findOne({
        enrollmentId,
        status: EnrollmentStatus.PENDING
    })
        .populate({ path: 'course', populate: 'school' })
        .exec();
    if (!enrollment) throw new NotFound('Enrollment not found');

    if (enrollment.course.school.schoolId !== user.schoolId) throw new Unauthorized();

    if (status === EnrollmentStatus.DECLINED) {
        const { reason } = req.body;
        if (typeof reason !== 'string') throw new UnprocessableEntity();

        enrollment.reason = reason;
    }

    enrollment.status = status;

    await enrollment.save();

    res.sendStatus(204);
};
