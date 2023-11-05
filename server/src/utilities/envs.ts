import { cleanEnv, makeValidator } from 'envalid';
import { str, port } from 'envalid/dist/validators';

const devDefault = (key: string, value: string) =>
    makeValidator<string>((): string => {
        const foundValue = process.env[key];
        if (process.env.NODE_ENV === 'production' && foundValue) return foundValue;
        return value;
    })();

export default cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port({ default: 4000 }),
    JWT_ACCESS: str(),
    JWT_REFRESH: str(),
    CORS_ORIGIN: devDefault('CORS_ORIGIN', 'http://localhost:3000'),
    MONGO_URI: devDefault(
        'MONGO_URI',
        'mongodb://127.0.0.1:27017/Online-Automated-Scheduling-Management-System-Driving-Schools'
    )
});
