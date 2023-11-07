import { getSchools } from "./school.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";

const router: Router = Router();

/**
 * ADMIN
 * [get own data]
 * 
 * INSTRUCTOR
 * [get school data]
 * 
 * STUDENT
 * schoolId (optional)
 */
router.get('/', asynchronousHandler(getSchools));

export default router;