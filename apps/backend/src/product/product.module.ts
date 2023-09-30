import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SphereService } from '../sphere/sphere.service';

@Module({
    controllers: [ProductController],
    providers: [ProductService, SphereService],
})
export class ProductModule {}
