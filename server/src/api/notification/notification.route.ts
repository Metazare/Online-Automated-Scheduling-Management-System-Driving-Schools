import { getNotifications } from "./notification.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";

const router: Router = Router();

router.get('/', asynchronousHandler(getNotifications));

export default router;