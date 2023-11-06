import { createCourse } from "./course.controller";
import { limitUsers } from "../../middlewares/authorize";
import { Role } from "../auth/auth.types";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";

const router: Router = Router();

/**
 * type
 */
router.post('/', limitUsers(Role.ADMIN), asynchronousHandler(createCourse));

export default router;