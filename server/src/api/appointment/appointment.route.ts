import { createAppointment, getAppointments, updateAppointment } from './appointment.controller';
import { limitUsers } from '../../middlewares/authorize';
import { Role } from '../auth/auth.types';
import { Router } from 'express';
import asynchronousHandler from '../../middlewares/asynchronousHandler';

const router: Router = Router();

/**
 * appoinmentId (optional)
 * enrollmentId (optional)
 * instructorId (optional)
 * status (optional)
 */
router.get('/', asynchronousHandler(getAppointments));

/**
 * enrollmentId
 * instructorId
 * vehicle
 * schedule
 */
router.post('/', limitUsers(Role.ADMIN), asynchronousHandler(createAppointment));

/**
 * ADMIN (change schedule date)
 * appointmentId
 * schedule
 * 
 * STUDENT (request to reschedule)
 * appointmentId
 */
router.patch('/', limitUsers(Role.ADMIN, Role.STUDENT), asynchronousHandler(updateAppointment));

export default router;
