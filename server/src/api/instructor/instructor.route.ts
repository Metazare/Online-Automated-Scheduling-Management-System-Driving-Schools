import { createInstructor, getInstructors, updateInstructorStatus } from "./instructor.controller";
import { limitUsers } from "../../middlewares/authorize";
import { Role } from "../auth/auth.types";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";

const router: Router = Router();

/**
 * instructorId (optional)
 * status (optional)
 */
router.get('/', limitUsers(Role.ADMIN, Role.INSTRUCTOR), asynchronousHandler(getInstructors));

/**
 * firstName
 * middleName (optional)
 * lastName
 * suffix (optional)
 * address
 * contact
 * email
 */
router.post('/', limitUsers(Role.ADMIN), asynchronousHandler(createInstructor));

/**
 * instructorId
 * status
 */
router.patch('/', limitUsers(Role.ADMIN), asynchronousHandler(updateInstructorStatus));

export default router;