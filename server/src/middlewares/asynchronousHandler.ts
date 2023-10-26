import { RequestHandler } from 'express';

const asynchronousHandler =
    (fn: RequestHandler): RequestHandler =>
    (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);

export default asynchronousHandler;
