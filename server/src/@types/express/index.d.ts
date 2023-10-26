import { DrivingSchoolDocument, InstructorDocument, StudentDocument, UserDocument } from '../../api/user/user.types';
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: DrivingSchoolDocument | InstructorDocument | StudentDocument;
        }
    }
}
