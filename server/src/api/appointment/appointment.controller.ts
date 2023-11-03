import {
    AppointmentDocument,
    AppointmentPopulatedDocument,
    AppointmentStatus,
    CreateAppointment,
    GetAppointments,
    UpdateAppointment
} from './appointment.types';
import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import { EnrollmentStatus } from '../enrollment/enrollment.types';
import { InstructorDocument } from '../instructor/instructor.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { Role } from '../auth/auth.types';
import { SchoolDocument } from '../school/school.types';
import { StudentDocument } from '../student/student.types';
import AppointmentModel from './appointment.model';
import InstructorModel from '../instructor/instructor.model';
import studentModel from '../student/student.model';

export const getAppointments: RequestHandler = async (req: QueryRequest<GetAppointments>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document, role } = req.user;

    const { appointmentId, studentId, instructorId, status } = req.query;

    const appointmentQuery: Record<string, unknown> = {};
    if (typeof appointmentId === 'string') appointmentQuery.appointmentid = appointmentId;
    if (typeof status === 'string') appointmentQuery.status = status;

    if (role === Role.INSTRUCTOR) {
        const user = <InstructorDocument>document;
        appointmentQuery.instructor = user._id;
    }

    if (role === Role.STUDENT) {
        const user = <StudentDocument>document;
        appointmentQuery.student = user._id;
    }

    let appointments: AppointmentPopulatedDocument[] = await AppointmentModel.find(appointmentQuery)
        .populate({ path: 'instructor', populate: 'school' })
        .populate('student')
        .exec();

    if (role === Role.ADMIN) {
        const user = <SchoolDocument>document;
        appointments = appointments.filter((appointment) => appointment.instructor.school.schoolId === user.schoolId);
    }

    if (typeof studentId === 'string')
        appointments = appointments.filter((appointment) => appointment.student.studentId === studentId);

    if (typeof instructorId === 'string')
        appointments = appointments.filter((appointment) => appointment.instructor.instructorId === instructorId);

    res.json(appointments);
};

export const createAppointment: RequestHandler = async (req: BodyRequest<CreateAppointment>, res) => {
    if (!req.user) throw new Unauthorized();

    const user = <SchoolDocument>req.user.document;

    const { studentId, instructorId, vehicle, schedule } = req.body;
    // prettier-ignore
    if (
        typeof studentId !== 'string' ||
        typeof instructorId !== 'string' ||
        typeof vehicle !== 'string' ||
        !schedule ||
        isNaN(Date.parse(schedule))
    ) throw new UnprocessableEntity();

    const [student, instructor] = await Promise.all([
        studentModel.findOne({ studentId, status: EnrollmentStatus.ACCEPTED }).exec(),
        InstructorModel.findOne({ instructorId, school: user._id }).exec()
    ]);

    if (!student) throw new NotFound();
    if (!instructor) throw new NotFound();

    await AppointmentModel.create({
        student: student._id,
        instructor: instructor._id,
        vehicle,
        schedule: new Date(schedule)
    });

    res.sendStatus(201);
};

export const updateAppointment: RequestHandler = async (req: BodyRequest<UpdateAppointment>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document, role } = req.user;

    const { appointmentId } = req.body;
    if (typeof appointmentId !== 'string') throw new UnprocessableEntity();

    if (role === Role.ADMIN) {
        const { schedule } = req.body;
        if (!schedule || isNaN(Date.parse(schedule))) throw new UnprocessableEntity();

        const user = <SchoolDocument>document;

        const appointment: AppointmentPopulatedDocument | null = await AppointmentModel.findOne({
            appointmentId,
            status: AppointmentStatus.RESCHEDULE
        })
            .populate({ path: 'instructor', populate: 'school' })
            .exec();
        if (!appointment || appointment.instructor.school.schoolId !== user.schoolId) throw new NotFound();

        appointment.schedule = new Date(schedule);
        appointment.status = AppointmentStatus.PENDING;

        await appointment.save();
    }

    if (role === Role.STUDENT) {
        const user = <StudentDocument>document;

        const { status } = req.body;
        if (typeof status !== 'string') throw new UnprocessableEntity();

        const appointment: AppointmentDocument | null = await AppointmentModel.findOne({
            appointmentId,
            student: user._id,
            status: AppointmentStatus.PENDING
        }).exec();
        if (!appointment) throw new NotFound();

        if (status === AppointmentStatus.PENDING) throw new UnprocessableEntity();

        appointment.status = status;

        await appointment.save();
    }

    res.sendStatus(204);
};
