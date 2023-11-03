import {
    AllRegister,
    InstructorRegister,
    Payload,
    Role,
    SchoolRegister,
    StudentRegister,
    UserLogin
} from './auth.types';
import { BodyRequest, RequestHandler } from 'express';
import { compareSync } from 'bcrypt';
import { cookieOptions, signAccess, signRefresh } from '../../utilities/cookies';
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
        about,
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

    return { email, password: newPassword };
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
    const { role, email } = req.body;
    let payload: Payload = { userId: '', role };

    const checkDuplicateEmail = await Promise.all([
        SchoolModel.exists({ 'credentials.email': email }).exec(),
        InstructorModel.exists({ 'credentials.email': email }).exec(),
        StudentModel.exists({ 'credentials.email': email }).exec()
    ]);
    if (checkDuplicateEmail.find(Boolean)) throw new UnprocessableEntity('Email already exists');

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
    const { email, password } = req.body;

    const findUser = await Promise.all([
        SchoolModel.findOne({ 'credentials.email': email }).exec(),
        InstructorModel.findOne({ 'credentials.email': email }).exec(),
        StudentModel.findOne({ 'credentials.email': email }).exec()
    ]);

    const user = findUser.find(Boolean);
    if (!user || !password || !compareSync(password, user.credentials.password)) throw new Unauthorized();

    let userId: string;
    let role: Role;

    // prettier-ignore
    if (user instanceof SchoolModel) {
        userId = user.schoolId;
        role = Role.ADMIN;
    }
    else if (user instanceof InstructorModel) {
        userId = user.instructorId;
        role = Role.INSTRUCTOR;
    }
    else if (user instanceof StudentModel) {
        userId = user.studentId;
        role = Role.STUDENT;
    }
    else throw new Unauthorized();

    const payload: Payload = { userId, role };

    res.cookie('access-token', signAccess(payload), cookieOptions.access)
        .cookie('refresh-token', signRefresh(payload), cookieOptions.refresh)
        .json({ ...user.toJSON(), role });
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
