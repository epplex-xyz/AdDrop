import { Injectable } from '@nestjs/common';
import { GetProductParams } from './dto/get-product-params';
import {prisma} from "@addrop/database"

@Injectable()
export class UserService {
    constructor() {}

    async create(createProductDto: any) {
        console.log("user1", createProductDto);
        let res;
        try {
            const test = await prisma.e
            const user = await prisma.user.create({
                data: {
                    ...createProductDto
                }
            })
            console.log("user", user);
            res = true
        } catch (e) {
            console.log("error", e)
            res = false
        }
        return {data: res}
    }

    async findAll(query: GetProductParams): Promise<any[]> {
        return 1 as any;
        // const comics = await this.productService.findAll(query);
    }
}
