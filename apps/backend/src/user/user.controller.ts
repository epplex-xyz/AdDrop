import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetProductParams } from './dto/get-product-params';
import { ReturnProductDTO } from './dto/product.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async create(
        @Body() createUserDto: any,
    ): Promise<{data: boolean}> {
        return await this.userService.create(createUserDto);
    }
}
