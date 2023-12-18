import {
    AppointmentPopulatedDocument,
    CreateAppointment,
    GetAppointments,
    UpdateAppointment
} from './appointment.types';
import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { EnrollmentStatus } from '../enrollment/enrollment.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { Role } from '../auth/auth.types';
import { SchoolDocument } from '../school/school.types';
import AppointmentModel from './appointment.model';
import EnrollmentModel from '../enrollment/enrollment.model';
import InstructorModel from '../instructor/instructor.model';

export const getAppointments: RequestHandler = async (req: QueryRequest<GetAppointments>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user, role } = req.user;

    const { appointmentId, enrollmentId, instructorId } = req.query;

    const appointmentQuery: Record<string, unknown> = {};
    if (typeof appointmentId === 'string') appointmentQuery.appointmentid = appointmentId;

    switch (role) {
        case Role.ADMIN:
            appointmentQuery.school = user._id;
            break;
        case Role.INSTRUCTOR:
            appointmentQuery.instructor = user._id;
            break;
        case Role.STUDENT:
            const studentEnrollments = await EnrollmentModel.find({ student: user._id }).exec();
            const studentEnrollmentIds = studentEnrollments.map((enrollment) => enrollment._id);
            appointmentQuery.enrollment = { $in: studentEnrollmentIds };
            break;
    }

    let appointments: AppointmentPopulatedDocument[] = await AppointmentModel.find(appointmentQuery)
        .populate('instructor school')
        .populate({
            path: 'enrollment',
            populate: 'school student'
        })
        .exec();

    if (typeof enrollmentId === 'string')
        appointments = appointments.filter((appointment) => appointment.enrollment.enrollmentId === enrollmentId);

    if (typeof instructorId === 'string')
        appointments = appointments.filter((appointment) => appointment.instructor.instructorId === instructorId);

    res.json(appointments);
};

export const createAppointment: RequestHandler = async (req: BodyRequest<CreateAppointment>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = <SchoolDocument>req.user.document;

    const { enrollmentId, instructorId, vehicle, date } = req.body;
    const checker = new CheckData();

    checker.checkType(enrollmentId, 'string', 'enrollmentId');
    checker.checkType(instructorId, 'string', 'instructorId');
    checker.checkType(vehicle, 'string', 'vehicle');
    checker.checkType(date, 'number', 'date');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const instructor = await InstructorModel.findOne({ instructorId, school: user._id }).exec();
    if (!instructor) throw new NotFound('Instructor');

    const enrollment = await EnrollmentModel.findOne({
        enrollmentId,
        school: user._id,
        status: EnrollmentStatus.ACCEPTED
    }).exec();
    if (!enrollment) throw new NotFound('Enrollment');

    await AppointmentModel.create({
        enrollment: enrollment._id,
        instructor: instructor._id,
        school: user._id,
        vehicle,
        date: new Date(date).setHours(0, 0, 0, 0)
    });

    res.sendStatus(201);
};

export const updateAppointment: RequestHandler = async (req: BodyRequest<UpdateAppointment>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = <SchoolDocument>req.user.document;

    const { appointmentId, schedule } = req.body;
    const checker = new CheckData();

    checker.checkType(appointmentId, 'string', 'appointmentId');
    checker.checkType(schedule, 'object', 'schedule');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    checker.checkType(schedule.name, 'string', 'schedule.name');
    checker.checkType(schedule.from, 'number', 'schedule.from');
    checker.checkType(schedule.to, 'number', 'schedule.to');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const appointment: AppointmentPopulatedDocument | null = await AppointmentModel.findOneAndUpdate(
        {
            appointmentId,
            school: user._id
        },
        { $set: { schedule } }
    );
    if (!appointment) throw new NotFound('Appointment');

    res.sendStatus(204);
};
