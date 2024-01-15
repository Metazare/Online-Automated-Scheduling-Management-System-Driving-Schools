import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { compareSync } from 'bcrypt';
import { cookieOptions, signAccess, signRefresh } from '../../utilities/cookies';
import { createSchool } from '../school/school.controller';
import { CreateSchool } from '../school/school.types';
import { createStudent } from '../student/student.controller';
import { CreateStudent } from '../student/student.types';
import { Payload, Role, UserLogin, UserRegister } from './auth.types';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import InstructorModel from '../instructor/instructor.model';
import SchoolModel from '../school/school.model';
import StudentModel from '../student/student.model';

export const register: RequestHandler = async (req: BodyRequest<UserRegister>, res) => {
    const { role, ...body } = req.body;
    const { email } = body;

    const checker: CheckData = new CheckData();

    checker.checkType(role, 'string', 'role');
    checker.checkType(email, 'string', 'email');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const checkDuplicateEmail = await Promise.all([
        SchoolModel.exists({ 'credentials.email': email }).exec(),
        InstructorModel.exists({ 'credentials.email': email }).exec(),
        StudentModel.exists({ 'credentials.email': email }).exec()
    ]);
    
    if (checkDuplicateEmail.find(Boolean)) {
        checker.addError('email', 'Duplicate email');
        throw new UnprocessableEntity(checker.errors);
    }

    let payload: Payload;

    if (role === Role.ADMIN) payload = await createSchool(<CreateSchool>body);
    else if (role === Role.STUDENT) payload = await createStudent(<CreateStudent>body);
    else {
        checker.addError('role', 'Invalid role');
        throw new UnprocessableEntity(checker.errors);
    }

    return res
        .cookie('access-token', signAccess(payload), cookieOptions.access)
        .cookie('refresh-token', signRefresh(payload), cookieOptions.refresh)
        .sendStatus(201);
};

export const login: RequestHandler = async (req: BodyRequest<UserLogin>, res) => {
    const { email, password } = req.body;
    const checker = new CheckData();

    checker.checkType(email, 'string', 'email');
    checker.checkType(password, 'string', 'password');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const findUser = await Promise.all([
        SchoolModel.findOne({ 'credentials.email': email }).exec(),
        InstructorModel.findOne({ 'credentials.email': email }).exec(),
        StudentModel.findOne({ 'credentials.email': email }).exec()
    ]);

    const user = findUser.find(Boolean);
    if (!user || !compareSync(password, user.credentials.password)) throw new Unauthorized();

    let payload: Payload;

    // prettier-ignore
    if (user instanceof SchoolModel) payload = { userId: user.schoolId, role: Role.ADMIN };
    else if (user instanceof InstructorModel) payload = { userId: user.instructorId, role: Role.INSTRUCTOR };
    else if (user instanceof StudentModel) payload = { userId: user.studentId, role: Role.STUDENT };
    else throw new Unauthorized();

    res.cookie('access-token', signAccess(payload), cookieOptions.access)
        .cookie('refresh-token', signRefresh(payload), cookieOptions.refresh)
        .json({ ...user.toJSON(), role: payload.role });
};

export const checkEmail: RequestHandler = async (req, res) => {
    const { email } = req.body;

    const checkDuplicateEmail = await Promise.all([
        SchoolModel.exists({ 'credentials.email': email }).exec(),
        InstructorModel.exists({ 'credentials.email': email }).exec(),
        StudentModel.exists({ 'credentials.email': email }).exec()
    ]);

    res.json({ duplicateEmail: checkDuplicateEmail.find(Boolean) });
}

export const logout: RequestHandler = async (_req, res) =>
    // prettier-ignore
    res.cookie('access-token', '', cookieOptions.default)
        .cookie('refresh-token', '', cookieOptions.default)
        .sendStatus(205);
