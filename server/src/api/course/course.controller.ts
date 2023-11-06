import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { Conflict, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { CreateCourse } from './course.types';
import { SchoolDocument } from '../school/school.types';

export const createCourse: RequestHandler = async (req: BodyRequest<CreateCourse>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = <SchoolDocument>req.user.document;

    const { type } = req.body;
    const checker = new CheckData();

    checker.checkType(type, 'string', 'type');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    if (user.courses.find(course => course.type === type)) throw new Conflict('Course already exists');
    
    user.courses.push({ type });
    await user.save();

    res.sendStatus(201);
};
