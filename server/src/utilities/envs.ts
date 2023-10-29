import { cleanEnv } from 'envalid';
import { str, port } from 'envalid/dist/validators';

export default cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port({ default: 4000 }),
    CORS_ORIGIN: str({ devDefault: 'http://localhost:3000' }),
    MONGO_URI: str({
        devDefault: 'mongodb://127.0.0.1:27017/Online-Automated-Scheduling-Management-System-Driving-Schools'
    }),
    JWT_ACCESS: str({ devDefault: '7cd875d5481dfaa6c01f87a48ade5bd72dc69cd93fe8bb3988daa6619ac8c922fe26778219d8d6fec58fd40b6d3adea64c4d19759a9294c95082a87466b8bf6438d2c2726de977f9ae778e043bfb6e3c5127f9b10dedb1636ccf376c2f634258dc401a35c90f0bbcca7892fb93bf946b55b722ed2b6614ff4e11026ae648c858' }),
    JWT_REFRESH: str({ devDefault: 'c768021b956b0c4fa38ec95ad1561b2bd1b3c4a3899644e4b3eb0dd47824df610cce10b43d4e18dd1296d3f29c9a64981a33e476a83c6d92992a0f995995ef2ce3211350ddf227de2a5b52a96b5ae3f9e70a44f1c33312342880f8acd9d441b715d8c846711eca7d19298b13f3ca6b1b0f60d2ed110aa2944c15c7aec6bab8bd' })
});
