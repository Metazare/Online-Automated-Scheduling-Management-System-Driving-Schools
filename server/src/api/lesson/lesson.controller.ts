import { BodyRequest, QueryRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import {
    CreateLesson,
    DeleteLesson,
    GetLessons,
    LessonDocument,
    LessonStatus,
    UpdateLesson,
    UpdateProgress
} from './lesson.types';
import { InstructorDocument } from '../instructor/instructor.types';
import { NotFound, Unauthorized, UnprocessableEntity } from '../../utilities/errors';
import { Role } from '../auth/auth.types';
import { SchoolDocument } from '../school/school.types';
import EnrollmentModel from '../enrollment/enrollment.model';
import LessonModel from './lesson.model';
import { EnrollmentPopulatedDocument } from '../enrollment/enrollment.types';

export const getLessons: RequestHandler = async (req: QueryRequest<GetLessons>, res) => {

    if (!req.user) throw new Unauthorized();
    const { document: user, role } = req.user;

    let school: SchoolDocument = <SchoolDocument>user;
    if (role === Role.INSTRUCTOR) school = (<InstructorDocument>user).school;

    const { courseId } = req.query;

    const courseIds = school.courses.map(({ courseId }) => <string>courseId);

    let lessons: Record<string, LessonDocument[]> | LessonDocument[] = await LessonModel.find({
        courseId: { $in: courseIds }
    }).exec();

    if (typeof courseId === 'string') lessons = lessons.filter((lesson) => lesson.courseId === courseId);
    else {
        lessons = courseIds.reduce(
            (acc, courseId) => ({
                ...acc,
                [courseId]: (<LessonDocument[]>lessons).filter((lesson) => lesson.courseId === courseId)
            }),
            <Record<string, LessonDocument[]>>{}
        );
    }

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
    console.log(lessonId)
    const checker = new CheckData();

    checker.checkType(lessonId, 'string', 'lessonId');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const courseIds = user.courses.map(({ courseId }) => courseId);

    const lesson = await LessonModel.findOneAndUpdate(
        { lessonId, courseId: { $in: courseIds } },
        { $set: { status: LessonStatus.INACTIVE } }
    ).exec();
    if (!lesson) throw new NotFound('Lesson');

    res.sendStatus(204);
};

export const updateProgress: RequestHandler = async (req: BodyRequest<UpdateProgress>, res) => {
    if (!req.user) throw new Unauthorized();
    const { document: user, role } = req.user;

    let school = user._id;
    if (role === Role.INSTRUCTOR) school = (<InstructorDocument>user).school;

    const { enrollmentId, lessonId, status, feedback } = req.body;
    const checker = new CheckData();

    checker.checkType(enrollmentId, 'string', 'enrollmentId');
    checker.checkType(lessonId, 'string', 'lessonId');
    checker.checkType(status, 'string', 'status');
    checker.checkType(feedback, 'string', 'feedback');
    if (checker.size()) throw new UnprocessableEntity(checker.errors);

    const enrollment: EnrollmentPopulatedDocument | null = await EnrollmentModel.findOne({ enrollmentId, school })
        .populate('progress.lesson')
        .exec();
    if (!enrollment) throw new NotFound('Enrollment');

    const lessonIndex = enrollment.progress.findIndex((lesson) => lesson.lesson.lessonId === lessonId);
    if (lessonIndex === -1) throw new NotFound('Lesson');

    enrollment.progress[lessonIndex].status = status;
    enrollment.progress[lessonIndex].feedback = feedback;
    await enrollment.save();

    res.sendStatus(204);
};
