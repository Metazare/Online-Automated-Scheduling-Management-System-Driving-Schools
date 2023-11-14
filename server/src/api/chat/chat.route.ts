import { Router } from "express";
import { getChats } from "./chat.controller";
import asynchronousHandler from "../../middlewares/asynchronousHandler";

const router: Router = Router();

router.get('/', asynchronousHandler(getChats));

export default router;