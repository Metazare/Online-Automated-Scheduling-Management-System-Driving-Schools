import { Data } from "./checkData";

export class Unauthorized extends Error {
    name: string = 'Unauthorized';
    statusCode: number = 401;

    constructor(message = 'Invalid credentials') {
        super(message);
    }
}

export class Forbidden extends Error {
    name: string = 'Forbidden';
    statusCode: number = 403;

    constructor(message = 'Invalid action') {
        super(message);
    }
}

export class NotFound extends Error {
    name: string = 'Not Found';
    statusCode: number = 404;

    constructor(resource = 'Resource') {
        super(`${resource} not existing`);
    }
}

export class Conflict extends Error {
    name: string = 'Duplicate';
    statusCode: number = 409;

    constructor(message = 'Duplicate resource found') {
        super(message);
    }
}

export class UnprocessableEntity extends Error {
    name: string = 'Unprocessable Entity';
    statusCode: number = 422;
    errors: Data[] = [];

    constructor(errors: Data[]) {
        super('Invalid input data');
        this.errors = errors;
    }
}
