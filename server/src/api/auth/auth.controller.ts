import { BodyRequest, RequestHandler } from 'express';
import { compareSync } from 'bcrypt';
import { cookieOptions, signAccess, signRefresh } from '../../utilities/cookies';
import { AllRegister, DrivingSchoolRegister, InstructorRegister, Payload, StudentRegister, UserLogin } from './auth.types';
import { InstructorPopulatedDocument } from '../instructor/instructor.types';
import { password } from '../../utilities/ids';
import { SchoolDocument } from '../school/school.types';
import { StudentDocument } from '../student/student.types';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import authenticate from '../../middlewares/authenticate';
import InstructorModel from '../instructor/instructor.model';
import SchoolModel from '../school/school.model';
import StudentModel from '../student/student.model';

const RegisterDrivingSchool = (body: SchoolRegister): Promise<SchoolDocument> => {
    const { name, about, address, contact, email, password } = body;

    return SchoolModel.create({
        name,
        address,
        contact,
        credentials: { email, password }
    });
};

const RegisterInstructor = async (body: InstructorRegister, admin: SchoolDocument): Promise<UserLogin> => {
    const { firstName, middleName, lastName, extensionName, address, contact, email } = body;

    const newPassword = password();

    await InstructorModel.create({
        name: {
            first: firstName,
            middle: middleName,
            last: lastName,
            extension: extensionName
        },
        address,
        contact,
        credentials: { email, password: newPassword },
        school: admin._id
    });

    return { email, password: newPassword, role: Role.INSTRUCTOR };
};

const RegisterStudent = (body: StudentRegister): Promise<StudentDocument> => {
    const { firstName, middleName, lastName, extensionName, address, birthday, contact, sex, email, password } = body;

    return StudentModel.create({
        name: {
            first: firstName,
            middle: middleName,
            last: lastName,
            extension: extensionName
        },
        address,
        contact,
        sex,
        birthday,
        credentials: { email, password }
    });
};

export const register: RequestHandler = async (req: BodyRequest<AllRegister>, res) => {
    const { role } = req.body;
    let payload: Payload = { userId: '', role };

    switch (role) {
        case Role.ADMIN:
            const { schoolId } = await RegisterDrivingSchool(<SchoolRegister>req.body);
            payload.userId = schoolId;
            break;
        case Role.INSTRUCTOR:
            const credentials = await RegisterInstructor(
                <InstructorRegister>req.body,
                <SchoolDocument>req.user?.document
            );
            return res.status(201).json(credentials);
        case Role.STUDENT:
            const { studentId } = await RegisterStudent(<StudentRegister>req.body);
            payload.userId = studentId;
            break;
        default:
            throw new UnprocessableEntity('Invalid role');
    }

    return res
        .cookie('access-token', signAccess(payload), cookieOptions.access)
        .cookie('refresh-token', signRefresh(payload), cookieOptions.refresh)
        .sendStatus(201);
};

export const login: RequestHandler = async (req: BodyRequest<UserLogin>, res) => {
    const { email, password, role } = req.body;

    let user: SchoolDocument | InstructorPopulatedDocument | StudentDocument | null;
    let userId: string | null;

    switch (role) {
        case Role.ADMIN:
            user = <SchoolDocument>await SchoolModel.findOne({ 'credentials.email': email }).exec();
            userId = user?.schoolId;
            break;
        case Role.INSTRUCTOR:
            user = <InstructorPopulatedDocument>(
                await InstructorModel.findOne({ 'credentials.email': email }).populate('school').exec()
            );
            userId = user?.instructorId;
            break;
        case Role.STUDENT:
            user = <StudentDocument>await StudentModel.findOne({ 'credentials.email': email }).exec();
            userId = user?.studentId;
            break;
        default:
            throw new UnprocessableEntity('Invalid user role');
    }

    if (!user || !password || !compareSync(password, user.credentials.password)) throw new Unauthorized();

    const payload: Payload = { userId, role };

    res.cookie('access-token', signAccess(payload), cookieOptions.access)
        .cookie('refresh-token', signRefresh(payload), cookieOptions.refresh)
        .json(user.toJSON());
};

export const logout: RequestHandler = async (_req, res) =>
    // prettier-ignore
    res.cookie('access-token', '', cookieOptions.default)
        .cookie('refresh-token', '', cookieOptions.default)
        .sendStatus(205);

export const checkIfAdmin: RequestHandler = (req: BodyRequest<AllRegister>, res, next) => {
    if (req.body.role === Role.INSTRUCTOR) return authenticate(req, res, next);
    next();
};
