import { BodyRequest, RequestHandler } from 'express';
import { CreateCourse } from './course.types';
import { SchoolDocument } from '../school/school.types';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import CourseModel from './course.model';

export const createCourse: RequestHandler = async (req: BodyRequest<CreateCourse>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = <SchoolDocument>req.user.document;

    const { type } = req.body;
    if (typeof type !== 'string') throw new UnprocessableEntity();

    await CourseModel.create({
        type,
        school: user._id
    });

    res.sendStatus(201);
};
