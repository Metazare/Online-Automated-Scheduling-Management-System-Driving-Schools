import { cleanEnv } from 'envalid';
import { str, port } from 'envalid/dist/validators';

export default cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port({ default: 4000 }),
    CORS_ORIGIN: str({ devDefault: 'http://localhost:3000/' }),
    MONGO_URI: str({
        devDefault: 'mongodb://127.0.0.1:27017/Online-Automated-Scheduling-Management-System-Driving-Schools'
    }),
    JWT_ACCESS: str(),
    JWT_REFRESH: str()
});
