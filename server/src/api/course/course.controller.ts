import { BodyRequest, RequestHandler } from 'express';
import { CreateCourse } from './course.types';
import { Conflict, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import CourseModel from './course.model';

export const createCourse: RequestHandler = async (req: BodyRequest<CreateCourse>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user } = req.user;

    const { type } = req.body;
    if (typeof type !== 'string') throw new UnprocessableEntity();

    const query = { type, school: user._id }

    const found = await CourseModel.findOneAndUpdate(query, query, { upsert: true });
    if (found) throw new Conflict();

    res.sendStatus(201);
};
