import { Router } from 'express';
import { limitUsers } from '../../middlewares/authorize';
import asynchronousHandler from '../../middlewares/asynchronousHandler';
import { getStudents } from './student.controller';
import { Role } from '../auth/auth.types';

const router: Router = Router();

/**
 * studentId (optional)
 * courseType (optional)
 */
router.get('/', limitUsers(Role.ADMIN, Role.INSTRUCTOR), asynchronousHandler(getStudents));

export default router;
