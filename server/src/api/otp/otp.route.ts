import { createOTP } from './otp.controller';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router: Router = Router();

router.post('/', asynchronousHandler(createOTP));

export default router;
