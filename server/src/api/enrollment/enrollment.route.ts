import { createEnrollment, getEnrollments, updateEnrollmentStatus } from "./enrollment.controller";
import { limitUsers } from "../../middlewares/authorize";
import { Role } from "../auth/auth.types";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";

const router = Router();

/**
 * enrollmentId (optional)
 * courseId (optional)
 * courseType (optional)
 * status (optional)
 */
router.get('/', limitUsers(Role.ADMIN, Role.STUDENT), asynchronousHandler(getEnrollments));

/**
 * courseId
 * days
 * startTime
 * endTime
 */
router.post('/', limitUsers(Role.STUDENT), asynchronousHandler(createEnrollment));

/**
 * enrollmentId
 * status
 * 
 * [status === 'declined']
 * reason
 */
router.patch('/', limitUsers(Role.ADMIN), asynchronousHandler(updateEnrollmentStatus));

export default router;