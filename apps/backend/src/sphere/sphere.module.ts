import { Module } from '@nestjs/common';
import { SphereController } from './sphere.controller';
import { SphereService } from './sphere.service';

@Module({
    controllers: [SphereController],
    providers: [SphereService],
})
export class SphereModule {}
