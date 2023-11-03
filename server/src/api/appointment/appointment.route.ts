import { createAppointment, getAppointments, updateAppointment } from './appointment.controller';
import { limitUsers } from '../../middlewares/authorize';
import { Role } from '../auth/auth.types';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router: Router = Router();

router.get('/', asynchronousHandler(getAppointments));

router.post('/', limitUsers(Role.ADMIN), asynchronousHandler(createAppointment));

router.patch('/', limitUsers(Role.ADMIN, Role.STUDENT), asynchronousHandler(updateAppointment));

export default router;
