import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { CreateLesson, DeleteLesson, GetLessons, LessonDocument, UpdateLesson, UpdateProgress } from './lesson.types';
import { InstructorDocument } from '../instructor/instructor.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { Role } from '../auth/auth.types';
import { SchoolDocument } from '../school/school.types';
import EnrollmentModel from '../enrollment/enrollment.model';
import LessonModel from './lesson.model';

export const getLessons: RequestHandler = async (req: QueryRequest<GetLessons>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = <SchoolDocument>req.user.document;

    const { courseId } = req.query;
    const isCourseIdGiven = typeof courseId === 'string';

    const courseIds = user.courses.map(({ courseId }) => <string>courseId);

    const lessonQuery: Record<string, unknown> = {};
    if (isCourseIdGiven) lessonQuery.courseId = { $in: courseIds };

    let lessons: Record<string, LessonDocument[]> | LessonDocument[] = await LessonModel.find(lessonQuery).exec();
    if (!isCourseIdGiven)
        lessons = courseIds.reduce(
            (acc, courseId) => ({
                ...acc,
                [courseId]: (<LessonDocument[]>lessons).filter((lesson) => lesson.courseId === courseId)
            }),
            <Record<string, LessonDocument[]>>{}
        );

    res.json(lessons);
};

export const createLesson: RequestHandler = async (req: BodyRequest<CreateLesson>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = <SchoolDocument>req.user.document;

    const { courseId, title, description } = req.body;
    let { file } = req.body;

    const checker = new CheckData();

    checker.checkType(courseId, 'string', 'courseId');
    checker.checkType(title, 'string', 'title');
    checker.checkType(description, 'string', 'description');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    file = typeof file === 'string' ? file : undefined;

    if (!user.courses.find((course) => course.courseId === courseId)) throw new NotFound('Course');

    await LessonModel.create({
        courseId,
        title,
        description,
        file
    });

    res.sendStatus(201);
};

export const updateLesson: RequestHandler = async (req: BodyRequest<UpdateLesson>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = <SchoolDocument>req.user.document;

    const { lessonId, title, description, file } = req.body;
    const checker = new CheckData();

    checker.checkType(lessonId, 'string', 'lessonId');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const updateLesson: Record<string, string> = {};
    if (typeof title === 'string') updateLesson.title = title;
    if (typeof description === 'string') updateLesson.description = description;
    if (typeof file === 'string') updateLesson.file = file;

    const courseIds = user.courses.map(({ courseId }) => courseId);

    const lesson = await LessonModel.findOneAndUpdate(
        { lessonId, courseId: { $in: courseIds } },
        { $set: updateLesson }
    ).exec();
    if (!lesson) throw new NotFound('Lesson');

    res.sendStatus(204);
};

export const deleteLesson: RequestHandler = async (req: BodyRequest<DeleteLesson>, res) => {
    if (!req.user) throw new Unauthorized();
    const user = <SchoolDocument>req.user.document;

    const { lessonId } = req.body;
    const checker = new CheckData();

    checker.checkType(lessonId, 'string', 'lessonId');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const courseIds = user.courses.map(({ courseId }) => courseId);

    const lesson = await LessonModel.findOneAndDelete({ lessonId, courseId: { $in: courseIds } }).exec();
    if (!lesson) throw new NotFound('Lesson');

    res.sendStatus(204);
};

export const updateProgress: RequestHandler = async (req: BodyRequest<UpdateProgress>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user, role } = req.user;

    let school = user._id;
    if (role === Role.INSTRUCTOR) school = (<InstructorDocument>user).school;

    const { enrollmentId, lessonId, status } = req.body;
    const checker = new CheckData();

    checker.checkType(enrollmentId, 'string', 'enrollmentId');
    checker.checkType(lessonId, 'string', 'lessonId');
    checker.checkType(status, 'string', 'status');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const enrollment = await EnrollmentModel.findOneAndUpdate(
        {
            enrollmentId,
            school,
            'progress.lessonId': lessonId
        },
        { $set: { 'progress.$.status': status } }
    ).exec();

    if (!enrollment) throw new NotFound('Enrollment');

    res.sendStatus(204);
};
