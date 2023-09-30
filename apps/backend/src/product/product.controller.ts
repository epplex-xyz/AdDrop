import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductParams } from './dto/get-product-params';
import { ReturnProductDTO } from './dto/product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @ApiBody({ type: CreateProductDto })
    @Post('create')
    async create(
        @Body() createProductDto: CreateProductDto,
    ): Promise<ReturnProductDTO> {
        return await this.productService.create(createProductDto);
    }

    @Get('get')
    async findAll(
        @Query() query: GetProductParams,
    ): Promise<ReturnProductDTO[]> {
        return await this.productService.findAll(query);
    }
}
