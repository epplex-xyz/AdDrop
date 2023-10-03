import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductParams } from './dto/get-product-params';
import { ReturnProductDTO } from './dto/product.dto';

@Controller('company')
export class CompanyController {
    constructor(private readonly productService: CompanyService) {}

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
