export interface Config {
    nest: NestConfig;
    cors: CorsConfig;
    swagger: SwaggerConfig;
    security: SecurityConfig;
    throttle: ThrottleConfig;
    sphere: SphereConfig;
}
export interface SphereConfig {
    apiKey: string;
}
export interface NestConfig {
    port: number;
    api: string;
}

export interface CorsConfig {
    enabled: boolean;
}

export interface SwaggerConfig {
    enabled: boolean;
    title: string;
    description: string;
    version: string;
    path: string;
    persistAuthorization: boolean;
}

export interface SecurityConfig {
    expiresIn: string;
    refreshIn: string;
    bcryptSaltOrRound: string | number;
}

export interface ThrottleConfig {
    ttl: number;
    limit: number;
    ignoreUserAgents: RegExp[];
}
