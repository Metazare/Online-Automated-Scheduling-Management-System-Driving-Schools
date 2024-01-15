import { checkEmail, login, logout, register } from './auth.controller';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';
import authenticate from '../../middlewares/authenticate';

const router = Router();

router.post('/login', asynchronousHandler(login));

/**
 * email
 * password
 */
router.post('/register', asynchronousHandler(register));

router.post('/checkemail', asynchronousHandler(checkEmail));

router.post('/logout', authenticate, asynchronousHandler(logout));

export default router;
