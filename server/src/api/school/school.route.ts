import { getSchools } from "./school.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";
import { limitUsers } from "../../middlewares/authorize";
import { Role } from "../auth/auth.types";

const router: Router = Router();

/**
 * schoolId (optional)
 */
router.get('/', limitUsers(Role.STUDENT), asynchronousHandler(getSchools));

export default router;