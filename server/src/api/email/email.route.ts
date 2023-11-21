import { sendEmail } from './email.controller';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router: Router = Router();

router.post('/', asynchronousHandler(sendEmail));

export default router;
