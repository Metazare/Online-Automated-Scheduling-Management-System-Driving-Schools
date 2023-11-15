import { CheckData } from '../../utilities/checkData';
import { CreateStudent, GetStudents, StudentsList } from './student.types';
import { Enrollment, EnrollmentPopulatedDocument } from '../enrollment/enrollment.types';
import { InstructorDocument } from '../instructor/instructor.types';
import { Payload, Role } from '../auth/auth.types';
import { QueryRequest, RequestHandler } from 'express';
import { SchoolDocument } from '../school/school.types';
import { Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import EnrollmentModel from '../enrollment/enrollment.model';
import StudentModel from './student.model';

export const getStudents: RequestHandler = async (req: QueryRequest<GetStudents>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user, role } = req.user;

    if (role === Role.STUDENT) return res.json(user);

    const { studentId, courseType } = req.query;

    let school: SchoolDocument = <SchoolDocument>user;
    if (role === Role.INSTRUCTOR) school = (<InstructorDocument>user).school;

    const enrollmentQuery: Record<string, unknown> = { school: school._id };
    if (typeof courseType === 'string')
        enrollmentQuery.courseId = school.courses.find((c) => c.type === courseType)?.courseId || '';

    let enrollments: EnrollmentPopulatedDocument[] = await EnrollmentModel.find(enrollmentQuery)
        .populate('student progress.lesson')
        .exec();

    if (typeof studentId === 'string')
        enrollments = enrollments.filter((enrollment) => enrollment.student.studentId === studentId);

    const students: StudentsList[] = enrollments.reduce((list, enrollment) => {
        const { school, student, ...rest } = enrollment.toJSON();
        const found = list.find((s) => s.studentId === student.studentId);

        if (found) found.enrollments.push(<Omit<Enrollment, 'school' | 'student'>>rest);
        else list.push({ ...student, enrollments: [rest] });

        return list;
    }, <StudentsList[]>[]);

    res.json(students);
};

export const createStudent = async (body: CreateStudent): Promise<Payload> => {
    const { firstName, lastName, address, contact, birthday, sex, email, password } = body;
    let { middleName, suffix } = body;

    const checker = new CheckData();

    checker.checkType(firstName, 'string', 'firstName');
    checker.checkType(lastName, 'string', 'lastName');
    checker.checkType(address, 'string', 'address');
    checker.checkType(contact, 'string', 'contact');
    checker.checkType(birthday, 'number', 'birthday');
    checker.checkType(sex, 'string', 'sex');
    checker.checkType(email, 'string', 'email');
    checker.checkType(password, 'string', 'password');
    if (middleName) checker.checkType(middleName, 'string', 'middleName');
    if (suffix) checker.checkType(suffix, 'string', 'suffix');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const { studentId } = await StudentModel.create({
        name: {
            first: firstName,
            middle: middleName,
            last: lastName,
            suffix
        },
        address,
        contact,
        birthday,
        sex,
        credentials: { email, password }
    });

    return { userId: studentId, role: Role.STUDENT };
};
