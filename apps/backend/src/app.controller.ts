import { Controller, Get, UseGuards } from '@nestjs/common';
import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(ThrottlerGuard)
@ApiTags('App')
@Controller('app')
export class AppController {
    constructor(private readonly appService: AppService) {}

    /* Hello World test endpoint */
    @Get('hello')
    get(): string {
        return this.appService.get();
    }

    @SkipThrottle()
    @Get('healthcheck')
    async healthCheck(): Promise<string> {
        return await this.appService.healthCheck();
    }
}
