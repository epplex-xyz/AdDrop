import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './configs/config';
import { SecurityConfig, ThrottleConfig } from './configs/config.interface';
import { ProductModule } from './product/product.module';
import { SphereModule } from './sphere/sphere.module';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                const securityConfig =
                    configService.get<SecurityConfig>('security');
                return {
                    secret: configService.get<string>('JWT_ACCESS_SECRET'),
                    signOptions: { expiresIn: securityConfig.expiresIn },
                };
            },
            inject: [ConfigService],
        }),
        PrismaModule.forRoot({
            isGlobal: true,
            prismaServiceOptions: {
                middlewares: [loggingMiddleware()],
            },
        }),
        ScheduleModule.forRoot(),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const throttleConfig =
                    configService.get<ThrottleConfig>('throttle');
                return {
                    ttl: throttleConfig.ttl,
                    limit: throttleConfig.limit,
                    ignoreUserAgents: throttleConfig.ignoreUserAgents,
                };
            },
        }),
        ProductModule,
        SphereModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
