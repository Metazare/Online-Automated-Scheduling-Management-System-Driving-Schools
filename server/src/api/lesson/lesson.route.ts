import { createLesson, deleteLesson, getLessons, updateLesson, updateProgress } from './lesson.controller';
import { limitUsers } from '../../middlewares/authorize';
import { Role } from '../auth/auth.types';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router: Router = Router();

/**
 * enrollmentId
 * lessonId
 * status
 */
router.patch('/progress', limitUsers(Role.ADMIN, Role.INSTRUCTOR), asynchronousHandler(updateProgress));

router.use(limitUsers(Role.ADMIN));

/**
 * courseId (optional)
 */
router.get('/', asynchronousHandler(getLessons));

/**
 * courseId
 * title
 * description
 * file (optional)
 */
router.post('/', asynchronousHandler(createLesson));

/**
 * lessonId
 * title (optional)
 * description (optional)
 * file (optional)
 */
router.patch('/', asynchronousHandler(updateLesson));

/**
 * lessonId
 */
router.delete('/', asynchronousHandler(deleteLesson));

export default router;
