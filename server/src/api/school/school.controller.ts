import { CheckData } from '../../utilities/checkData';
import { CreateSchool, GetSchools } from './school.types';
import { Payload, Role } from '../auth/auth.types';
import { QueryRequest, RequestHandler } from 'express';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
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

export const editSchool: RequestHandler = async (req, res) => {
  try {
      if (!req.user) throw new Unauthorized();
      const { role } = req.user;

      if (role !== Role.ADMIN) throw new Unauthorized('Only admin can edit school details.');

      const { schoolId } = req.body; // Assuming schoolId is part of the URL parameters
      const updatedData = req.body;

      // Validate the input data
      const checker = new CheckData();
      Object.entries(updatedData).forEach(([key, value]) => {
          checker.checkType(value, 'string', key);
      });

      if (checker.size()) throw new UnprocessableEntity(checker.errors);

      const updatedSchool = await SchoolModel.findOneAndUpdate(
          { schoolId },
          { $set: updatedData },
          { new: true } // Return the updated document
      ).exec();

      if (!updatedSchool) {
          throw new NotFound('School');
      }

      res.json(updatedSchool);
  } catch (error) {
      console.error('Error editing school details:', error);
      // Handle error and send an appropriate response
      res.status(500).json({ error: 'Internal Server Error' });
  }
};