import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
// import { SphereService } from '../sphere/sphere.service';
import { GetProductParams } from './dto/get-product-params';
import { ReturnProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor() {}

    async create(createProductDto: CreateProductDto) {
        return 1 as any;
    }

    async findAll(query: GetProductParams): Promise<any[]> {
        return 1 as any;
        // const comics = await this.productService.findAll(query);
    }
}
