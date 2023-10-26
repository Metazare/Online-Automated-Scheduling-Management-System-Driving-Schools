import { cookieOptions, signAccess, signRefresh } from '../utilities/cookies';
import { DrivingSchoolDocument, InstructorDocument, Role, StudentDocument, UserDocument } from '../api/user/user.types';
import { JwtPayload, verify } from 'jsonwebtoken';
import { NotFound, Unauthorized } from '../utilities/errors';
import { Payload } from '../api/auth/auth.types';
import { RequestHandler } from 'express';
import envs from '../utilities/envs';
import UserModel from '../api/user/user.model';

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
        const user: UserDocument | null = await UserModel.findOne({ userId: payload.userId, role: payload.role });
        if (!user) return next(new NotFound('User not found'));

        switch (user.role) {
            case Role.ADMIN:
                req.user = user as DrivingSchoolDocument;
                break;
            case Role.INSTRUCTOR:
                req.user = user as InstructorDocument;
                break;
            case Role.STUDENT:
                req.user = user as StudentDocument;
                break;
        }

        return next();
    }
};

export default authenticate;
