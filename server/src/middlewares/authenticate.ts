import { AllUserDocument, Payload, Role } from '../api/auth/auth.types';
import { cookieOptions, signAccess, signRefresh } from '../utilities/cookies';
import { Forbidden, Unauthorized } from '../utilities/errors';
import { JwtPayload, verify } from 'jsonwebtoken';
import { RequestHandler } from 'express';
import envs from '../utilities/envs';
import InstructorModel from '../api/instructor/instructor.model';
import SchoolModel from '../api/school/school.model';
import StudentModel from '../api/student/student.model';

const refreshTime = 5 * 24 * 60 * 60 * 1000; // 5 days

const authenticate: RequestHandler = async (req, res, next) => {
    const { 'access-token': accessToken, 'refresh-token': refreshToken } = req.cookies;

    if (!refreshToken) return next(new Unauthorized('This action requires logging in first'));

    let payload: Payload | undefined;

    try {
        payload = verify(accessToken, envs.JWT_ACCESS) as Payload;
    } catch (err) {}

    if (!payload) {
        try {
            const { userId, role, exp = new Date() } = verify(refreshToken, envs.JWT_REFRESH) as JwtPayload & Payload;
            payload = { userId, role };

            res.cookie('access-token', signAccess(payload), cookieOptions.access);

            if (Date.now() - new Date(exp).getTime() > refreshTime)
                res.cookie('refresh-token', signRefresh(payload), cookieOptions.refresh);
        } catch (err) {
            res.cookie('access-token', '', cookieOptions.default).cookie('refresh-token', '', cookieOptions.default);
            return next(err);
        }
    }

    if (payload) {
        let user: AllUserDocument | null;
        const { userId, role } = payload;

        switch (payload.role) {
            case Role.ADMIN:
                user = await SchoolModel.findOne({ schoolId: userId }).exec();
                break;
            case Role.INSTRUCTOR:
                user = await InstructorModel.findOne({ instructorId: userId }).populate('school').exec();
                break;
            case Role.STUDENT:
                user = await StudentModel.findOne({ studentId: userId }).exec();
                break;
            default:
                return next(new Unauthorized('Invalid user role'));
        }

        if (!user) return next(new Forbidden());

        req.user = { document: user, role };

        return next();
    }
};

export default authenticate;
