import { Forbidden, Unauthorized } from '../utilities/errors';
import { RequestHandler } from 'express';
import { Role } from '../api/auth/auth.types';

export const limitUsers =
    (...roles: Role[]): RequestHandler =>
    (req, _res, next) => {
        if (!req.user) return next(new Unauthorized());
        if (!roles.includes(req.user.role)) return next(new Forbidden());

        next();
    };
