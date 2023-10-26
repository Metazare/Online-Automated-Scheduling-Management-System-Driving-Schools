import { getUser } from "./user.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";

const router = Router();

router.get('/', asynchronousHandler(getUser));

export default router;