import { createEnrollment, updateEnrollmentStatus } from "./enrollment.controller";
import { limitUsers } from "../../middlewares/authorize";
import { Role } from "../auth/auth.types";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";

const router = Router();

router.post('/', limitUsers(Role.STUDENT), asynchronousHandler(createEnrollment));

router.patch('/', limitUsers(Role.ADMIN), asynchronousHandler(updateEnrollmentStatus));

export default router;