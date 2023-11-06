import {
    AppointmentPopulatedDocument,
    AppointmentStatus,
    CreateAppointment,
    GetAppointments,
    UpdateAppointment
} from './appointment.types';
import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { Enrollment, EnrollmentStatus } from '../enrollment/enrollment.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { Role } from '../auth/auth.types';
import { SchoolDocument } from '../school/school.types';
import AppointmentModel from './appointment.model';
import EnrollmentModel from '../enrollment/enrollment.model';
import InstructorModel from '../instructor/instructor.model';

const checkSchedule = (dateSchedule: Date, availability: Enrollment['availability']) => {
    const {
        days,
        time: { start, end }
    } = availability;

    if (!days.includes(dateSchedule.getDay())) return false;
    if (dateSchedule.getHours() < start || dateSchedule.getHours() >= end) return false;
    return true;
};

export const getAppointments: RequestHandler = async (req: QueryRequest<GetAppointments>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user, role } = req.user;

    const { appointmentId, enrollmentId, instructorId, status } = req.query;

    const appointmentQuery: Record<string, unknown> = {};
    if (typeof appointmentId === 'string') appointmentQuery.appointmentid = appointmentId;
    if (typeof status === 'string') appointmentQuery.status = status;

    switch (role) {
        case Role.ADMIN:
            appointmentQuery.school = user._id;
            break;
        case Role.INSTRUCTOR:
            appointmentQuery.instructor = user._id;
            break;
        case Role.STUDENT:
            appointmentQuery.student = user._id;
            break;
    }

    let appointments: AppointmentPopulatedDocument[] = await AppointmentModel.find(appointmentQuery)
        .populate('instructor enrollment school')
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

    const { enrollmentId, instructorId, vehicle, schedule } = req.body;
    const checker = new CheckData();

    checker.checkType(enrollmentId, 'string', 'enrollmentId');
    checker.checkType(instructorId, 'string', 'instructorId');
    checker.checkType(vehicle, 'string', 'vehicle');
    checker.checkType(schedule, 'number', 'string');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const instructor = await InstructorModel.findOne({ instructorId, school: user._id }).exec();
    if (!instructor) throw new NotFound('Instructor');

    const enrollment = await EnrollmentModel.findOne({
        enrollmentId,
        school: user._id,
        status: EnrollmentStatus.ACCEPTED
    }).exec();
    if (!enrollment) throw new NotFound('Enrollment');

    const dateSchedule = new Date(schedule);
    if (!checkSchedule(dateSchedule, enrollment.availability)) {
        checker.addError('schedule', "Schedule is out of student's availability");
        throw new UnprocessableEntity(checker.errors);
    }

    await AppointmentModel.create({
        enrollment: enrollment._id,
        instructor: instructor._id,
        school: user._id,
        vehicle,
        schedule: dateSchedule
    });

    res.sendStatus(201);
};

export const updateAppointment: RequestHandler = async (req: BodyRequest<UpdateAppointment>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user, role } = req.user;

    const { appointmentId } = req.body;
    const checker = new CheckData();

    checker.checkType(appointmentId, 'string', 'appointmentId');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    if (role === Role.ADMIN) {
        const { schedule } = req.body;

        checker.checkType(schedule, 'number', 'schedule');
        if (checker.size()) throw new UnprocessableEntity(checker.errors);

        const appointment: AppointmentPopulatedDocument | null = await AppointmentModel.findOne({
            appointmentId,
            school: user._id,
            status: { $ne: AppointmentStatus.ACCEPTED }
        })
            .populate('enrollment')
            .exec();
        if (!appointment) throw new NotFound('Appointment');

        const dateSchedule = new Date(<number>schedule);
        if (!checkSchedule(dateSchedule, appointment.enrollment.availability)) {
            checker.addError('schedule', "Schedule is out of student's availability");
            throw new UnprocessableEntity(checker.errors);
        }

        appointment.schedule = dateSchedule;
        appointment.status = AppointmentStatus.PENDING;
        await appointment.save();
    }

    if (role === Role.STUDENT) {
        const { status } = req.body;

        checker.checkType(status, 'string', 'status');
        checker.checkValue(status, AppointmentStatus.PENDING, 'status');
        if (checker.size()) throw new UnprocessableEntity(checker.errors);

        const appointment = await AppointmentModel.findOneAndUpdate(
            {
                appointmentId,
                student: user._id,
                status: AppointmentStatus.PENDING
            },
            { status }
        ).exec();

        if (!appointment) throw new NotFound('Appointment');
    }

    res.sendStatus(204);
};
