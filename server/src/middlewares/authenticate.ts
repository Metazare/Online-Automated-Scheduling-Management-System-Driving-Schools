import { cookieOptions, signAccess, signRefresh } from '../utilities/cookies';
import { Forbidden, Unauthorized } from '../utilities/errors';
import { InstructorDocument } from '../api/instructor/instructor.types';
import { JwtPayload, verify } from 'jsonwebtoken';
import { AllUserDocument, Payload, Role } from '../api/auth/auth.types';
import { RequestHandler } from 'express';
import { SchoolDocument } from '../api/school/school.types';
import { StudentDocument } from '../api/student/student.types';
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

        switch (payload.role) {
            case Role.ADMIN:
                user = <SchoolDocument>await SchoolModel.findOne({ schoolId: payload.userId });
                break;
            case Role.INSTRUCTOR:
                user = <InstructorDocument>await InstructorModel.findOne({ instructorId: payload.userId });
                break;
            case Role.STUDENT:
                user = <StudentDocument>await StudentModel.findOne({ studentId: payload.userId });
                break;
            default:
                return next(new Unauthorized('Invalid user role'));
        }

        if (!user) return next(new Forbidden());

        req.user = { document: user, role: payload.role };

        return next();
    }
};

export default authenticate;
