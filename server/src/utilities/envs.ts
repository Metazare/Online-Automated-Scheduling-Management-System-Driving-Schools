import { cleanEnv } from 'envalid';
import { str, port } from 'envalid/dist/validators';

export default cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port({ default: 4000 }),
    JWT_ACCESS: str(),
    JWT_REFRESH: str(),
    CORS_ORIGIN: str(),
    MONGO_URI: str(),
    RESEND_KEY: str()
});
