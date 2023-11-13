import { Router } from "express";
import { getNotifications } from "./notification.controller";

const router: Router = Router();

router.get('/', getNotifications);

export default router;