import { checkIfAdmin, login, logout, register } from "./auth.controller";
import { Router } from "express";
import asynchronousHandler from "../../middlewares/asynchronousHandler";
import authenticate from "../../middlewares/authenticate";

const router = Router();

router.post('/login', asynchronousHandler(login));
router.post('/register', checkIfAdmin, asynchronousHandler(register));

router.use(authenticate);

router.post('/logout', asynchronousHandler(logout));

export default router;