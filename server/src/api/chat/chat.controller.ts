import { CreateMessage } from './chat.types';
import { Forbidden, Unauthorized } from '../../utilities/errors';
import { RequestHandler } from 'express';
import { Role } from '../auth/auth.types';
import ChatModel from './chat.model';
import InstructorModel from '../instructor/instructor.model';
import SchoolModel from '../school/school.model';
import StudentModel from '../student/student.model';

export const getChats: RequestHandler = async (req, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user } = req.user;

    let userId = '';
    if (user instanceof SchoolModel) userId = user.schoolId;
    if (user instanceof InstructorModel) userId = user.instructorId;
    if (user instanceof StudentModel) userId = user.studentId;

    const chats = await ChatModel.find({ 'members.user': userId }).exec();

    res.json(chats);
};

export const createMessage = async (req: CreateMessage) => {
    const { sender, receiver } = req;

    if ((sender.role === Role.ADMIN || sender.role === Role.INSTRUCTOR) && receiver.role !== Role.STUDENT)
        throw new Forbidden();
    if (sender.role === Role.STUDENT && receiver.role !== Role.STUDENT) throw new Forbidden();

    await ChatModel.findOneAndUpdate(
        { 'members.user': { $all: [sender.userId, receiver.userId] } },
        {
            $push: {
                'messages.user': sender.userId,
                'messages.message': req.message
            }
        },
        { upsert: true }
    );
};
