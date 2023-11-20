import { getStudents, updateStudentProfile } from './student.controller';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router: Router = Router();

/**
 * STUDENT
 * [get own data]
 * 
 * ADMIN | INSTRUCTOR
 * studentId (optional)
 * courseType (optional)
 */
router.get('/', asynchronousHandler(getStudents));

router.patch('/', asynchronousHandler(updateStudentProfile));

export default router;
