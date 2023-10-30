import { DrivingSchoolDocument } from '../../api/drivingSchool/drivingSchool.types';
import { InstructorDocument } from '../../api/instructor/instructor.types';
import { StudentDocument } from '../../api/student/student.types';
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: DrivingSchoolDocument | InstructorDocument | StudentDocument;
        }
    }
}
