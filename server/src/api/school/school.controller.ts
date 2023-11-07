import { CheckData } from '../../utilities/checkData';
import { CreateSchool, GetSchools } from './school.types';
import { Payload, Role } from '../auth/auth.types';
import { QueryRequest, RequestHandler } from 'express';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import SchoolModel from './school.model';
import { InstructorPopulatedDocument } from '../instructor/instructor.types';

export const getSchools: RequestHandler = async (req: QueryRequest<GetSchools>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user, role } = req.user;

    if (role === Role.ADMIN) return res.json(user);
    if (role === Role.INSTRUCTOR) return res.json((<InstructorPopulatedDocument>user).school);

    const { schoolId } = req.query;

    const schoolQuery: Record<string, string> = {};
    if (typeof schoolId === 'string') schoolQuery.schoolId = schoolId;

    const schools = await SchoolModel.find(schoolQuery).exec();

    res.json(schools);
};

export const createSchool = async (body: CreateSchool): Promise<Payload> => {
    const { name, about, address, contact, email, password } = body;
    const checker = new CheckData();

    checker.checkType(name, 'string', 'name');
    checker.checkType(about, 'string', 'about');
    checker.checkType(address, 'string', 'address');
    checker.checkType(contact, 'string', 'contact');
    checker.checkType(email, 'string', 'email');
    checker.checkType(password, 'string', 'password');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const { schoolId } = await SchoolModel.create({
        name,
        about,
        address,
        contact,
        credentials: { email, password }
    });

    return { userId: schoolId, role: Role.ADMIN };
};
