import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppModule } from './app.module';
import {
    CorsConfig,
    NestConfig,
} from './configs/config.interface';
// import {TrpcRouter} from "./trpc/trpc.router";

// Boot Strap
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Validation
    // strip validated object of any properties that don't have any decorator
    // transform incoming network payloads into DTOs
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );

    // enable shutdown hook
    app.enableShutdownHooks();

    // Prisma Client Exception Filter for unhandled exceptions
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    const configService = app.get(ConfigService);
    const nestConfig = configService.get<NestConfig>('nest');
    const corsConfig = configService.get<CorsConfig>('cors');

    if (!nestConfig) throw new Error('Nest configuration missing');
    if (!corsConfig) throw new Error('CORS configuration missing');

    // Cors
    if (corsConfig.enabled) {
        app.enableCors();
    }

    // const trpc = app.get(TrpcRouter);
    // trpc.applyMiddleware(app);

    await app.listen(process.env.PORT || nestConfig.port || 3005);
}

bootstrap();
