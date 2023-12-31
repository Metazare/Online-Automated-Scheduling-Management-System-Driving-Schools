import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { CreateInstructor, InstructorDocument, UpdateInstructor, UpdateInstructorStatus } from './instructor.types';
import { password } from '../../utilities/ids';
import { Role } from '../auth/auth.types';
import { SchoolDocument } from '../school/school.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import InstructorModel from './instructor.model';
import { createEmail } from '../email/email.controller';

export const getInstructors: RequestHandler = async (req, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user, role } = req.user;

    const { status, instructorId } = req.query;

    let school: SchoolDocument = <SchoolDocument>user;
    if (role === Role.INSTRUCTOR) school = (<InstructorDocument>user).school;

    const instructorQuery: Record<string, unknown> = { school: school._id };
    if (typeof instructorId === 'string') instructorQuery.instructorId = instructorId;
    if (typeof status === 'string') instructorQuery.status = status;

    const instructors = await InstructorModel.find(instructorQuery, { school: 0 }).exec();

    res.json(instructors);
};

export const createInstructor: RequestHandler = async (req: BodyRequest<CreateInstructor>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user } = req.user;

    const { firstName, middleName, lastName, suffix, address, contact, email } = req.body;

    const checker = new CheckData();

    checker.checkType(firstName, 'string', 'firstName');
    checker.checkType(lastName, 'string', 'lastName');
    checker.checkType(address, 'string', 'address');
    checker.checkType(contact, 'string', 'contact');
    checker.checkType(email, 'string', 'email');
    if (middleName) checker.checkType(middleName, 'string', 'middleName');
    if (suffix) checker.checkType(suffix, 'string', 'suffix');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const credentials = { email, password: password() };
    await InstructorModel.create({
        name: {
            first: firstName,
            middle: middleName,
            last: lastName,
            suffix
        },
        address,
        contact,
        credentials,
        school: user._id
    });

    await createEmail(email, 'Instructor Credentials', `Here is your account credentials<br><strong>Email</strong>: ${email}<br><strong>Password</strong>: ${credentials.password}`);

    res.sendStatus(204);
};

export const updateInstructorStatus: RequestHandler = async (req: BodyRequest<UpdateInstructorStatus>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user } = req.user;

    const { instructorId, status } = req.body;
    const checker = new CheckData();

    checker.checkType(instructorId, 'string', 'instructorId');
    checker.checkType(status, 'string', 'status');

    const instructor = await InstructorModel.findOneAndUpdate({ instructorId, school: user._id }, { status }).exec();
    if (!instructor) throw new Unauthorized();

    res.sendStatus(204);
};

export const updateInstructor: RequestHandler = async (req: BodyRequest<UpdateInstructor>, res) => {
  try {
      
      const { instructorId } = req.body;
      const updatedData = req.body;
      
      // Validate the input data
      const checker = new CheckData();
      Object.entries(updatedData).forEach(([key, value]) => {
          checker.checkType(value, 'string', key);
      });

      if (checker.size()) throw new UnprocessableEntity(checker.errors);

      const updatedInstructor = await InstructorModel.findOneAndUpdate(
          { instructorId },
          { $set: updatedData },
          { new: true } // Return the updated document
      ).exec();

      if (!updatedInstructor) {
          throw new NotFound('Instructor');
      }

      res.json(updatedInstructor);
  } catch (error) {
      console.error('Error updating instructor details:', error);
      // Handle error and send an appropriate response
      res.status(500).json({ error: 'Internal Server Error' });
  }
};