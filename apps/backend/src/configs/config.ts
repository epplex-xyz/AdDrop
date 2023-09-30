import { Config } from './config.interface';

const config: Config = {
    nest: {
        port: 3005,
        api: process.env.API_URL,
    },
    cors: {
        enabled: true,
    },
    swagger: {
        enabled: true,
        title: process.env.TITLE,
        description: 'API endpoints',
        version: process.env.VERSION,
        path: 'api',
        persistAuthorization: true,
    },
    security: {
        expiresIn: '7d',
        refreshIn: '30d',
        bcryptSaltOrRound: 10,
    },
    throttle: {
        ttl: 30,
        limit: 120,
        ignoreUserAgents: [],
    },
    sphere: {
        apiKey: process.env.SPHERE_KEY,
    },
};

export default (): Config => config;
