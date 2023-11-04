import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { Conflict, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { CreateCourse } from './course.types';
import CourseModel from './course.model';

export const createCourse: RequestHandler = async (req: BodyRequest<CreateCourse>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user } = req.user;

    const { type } = req.body;
    const checker = new CheckData();

    checker.checkType(type, 'string', 'type');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const query = { type, school: user._id };

    const found = await CourseModel.findOneAndUpdate(query, query, { upsert: true });
    if (found) throw new Conflict('Course already exists');

    res.sendStatus(201);
};
