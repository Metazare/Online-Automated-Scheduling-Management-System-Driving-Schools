import { InstructorDocument } from '../../api/instructor/instructor.types';
import { Role, User } from '../../api/auth/auth.types';
import { SchoolDocument } from '../../api/school/school.types';
import { StudentDocument } from '../../api/student/student.types';
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

declare module 'express' {
    export interface BodyRequest<T> extends Request<{}, {}, T> {}
    export interface QueryRequest<T> extends Request<{}, {}, {}, T> {}
}
