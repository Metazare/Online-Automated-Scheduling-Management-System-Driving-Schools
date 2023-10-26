import { compareSync } from 'bcrypt';
import { cookieOptions, signAccess, signRefresh } from '../../utilities/cookies';
import { Payload } from './auth.types';
import { RequestHandler } from 'express';
import { Role, UserDocument } from '../user/user.types';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import UserModel from '../user/user.model';

const pwPattern: RegExp = /^(?=^(?!.*\n).*$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,32}$/;
const drivingSchool = (body: any) => {
    const { name, address, contact, email, password } = body;
    if (typeof name !== 'string') throw new UnprocessableEntity();

    return UserModel.create({
        name,
        address,
        contact,
        credentials: { email, password },
        role: Role.ADMIN
    });
};

const instructor = (body: any) => {
    const { name, address, contact, sex, email, password } = body;
    if (!name) throw new UnprocessableEntity();

    const { first, middle, last, extension } = name;

    return UserModel.create({
        name: { first, middle, last, extension },
        address,
        contact,
        sex,
        credentials: { email, password },
        role: Role.INSTRUCTOR
    });
};

const student = (body: any) => {
    const { name, address, birthday, contact, sex, email, password } = body;
    if (!name) throw new UnprocessableEntity();

    const { first, middle, last, extension } = name;

    return UserModel.create({
        name: { first, middle, last, extension },
        address,
        contact,
        sex,
        birthday,
        credentials: { email, password },
        role: Role.INSTRUCTOR
    });
};

export const register: RequestHandler = async (req, res) => {
    const { role, password } = req.body;

    if (!pwPattern.test(password)) throw new UnprocessableEntity('Invalid password format');

    switch (role) {
        case Role.ADMIN:
            await drivingSchool(req.body);
            break;
        case Role.INSTRUCTOR:
            await instructor(req.body);
            break;
        case Role.STUDENT:
            await student(req.body);
            break;
        default:
            throw new UnprocessableEntity('Invalid role');
    }

    res.sendStatus(201);
};

export const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    const user: UserDocument | null = await UserModel.findOne({ 'credentials.email': email });
    if (!user || !password || !compareSync(password, user.credentials.password)) throw new Unauthorized();

    const payload: Payload = {
        userId: user.userId,
        role: user.role
    };

    res.cookie('access-token', signAccess(payload), cookieOptions.access)
        .cookie('refresh-token', signRefresh(payload), cookieOptions.refresh)
        .sendStatus(204);
};

export const logout: RequestHandler = async (_req, res) =>
    // prettier-ignore
    res.cookie('access-token', '', cookieOptions.default)
        .cookie('refresh-token', '', cookieOptions.default)
        .sendStatus(205);
