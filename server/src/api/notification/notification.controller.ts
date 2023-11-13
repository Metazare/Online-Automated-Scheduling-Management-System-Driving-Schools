import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { CreateNotification, NotificationStatus, ReadNotification } from './notification.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import InstructorModel from '../instructor/instructor.model';
import NotificationModel from './notification.model';
import SchoolModel from '../school/school.model';
import StudentModel from '../student/student.model';

export const getNotifications: RequestHandler = async (req, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user } = req.user;

    let userId = '';
    if (user instanceof SchoolModel) userId = user.schoolId;
    if (user instanceof InstructorModel) userId = user.instructorId;
    if (user instanceof StudentModel) userId = user.studentId;

    const notifications = await NotificationModel.find({ 'targets.userId': userId }).exec();

    res.json(notifications);
};

export const createNotification = async (req: CreateNotification) => {
    const { sender, targets, content } = req;

    await NotificationModel.create({ sender, targets, content });
};

export const readNotification: RequestHandler = async (req: BodyRequest<ReadNotification>, res) => {
    const { notificationId } = req.body;

    const checker = new CheckData();
    checker.checkType(notificationId, 'string', 'notificationId');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const notification = await NotificationModel.findOneAndUpdate(
        { notificationId },
        { status: NotificationStatus.READ }
    ).exec();
    if (!notification) throw new NotFound('Notification');

    res.sendStatus(204);
};
