import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { SphereService } from '../sphere/sphere.service';
import { GetProductParams } from './dto/get-product-params';
import { ReturnProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly sphereService: SphereService) {}

    async create(createProductDto: CreateProductDto) {
        return await this.sphereService.createProduct(createProductDto);
    }

    async findAll(query: GetProductParams): Promise<ReturnProductDTO[]> {
        return await this.sphereService.listAllProducts(query);
        // const comics = await this.productService.findAll(query);
    }
}
