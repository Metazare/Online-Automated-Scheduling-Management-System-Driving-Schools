import { CheckData } from '../../utilities/checkData';
import { CreateSchool, GetSchools } from './school.types';
import { Payload, Role } from '../auth/auth.types';
import { QueryRequest, RequestHandler } from 'express';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import schoolModel from './school.model';

export const getSchools: RequestHandler = async (req: QueryRequest<GetSchools>, res) => {
    if (!req.user) throw new Unauthorized();

    const { schoolId } = req.query;

    const schoolQuery: Record<string, string> = {};
    if (typeof schoolId === 'string') schoolQuery.schoolId = schoolId;

    const schools = await schoolModel.find(schoolQuery).exec();

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

    const { schoolId } = await schoolModel.create({
        name,
        about,
        address,
        contact,
        credentials: { email, password }
    });

    return { userId: schoolId, role: Role.ADMIN };
};
