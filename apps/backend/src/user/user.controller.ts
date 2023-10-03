import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetProductParams } from './dto/get-product-params';
import { ReturnProductDTO } from './dto/product.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async create(
        @Body() createProductDto: any,
    ): Promise<{data: boolean}> {
        return await this.userService.create(createProductDto);
    }

    @Get('get')
    async findAll(
        @Query() query: GetProductParams,
    ): Promise<ReturnProductDTO[]> {
        return await this.userService.findAll(query);
    }
}
