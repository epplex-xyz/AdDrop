import { Injectable } from '@nestjs/common';
import {prisma} from "@addrop/database"

@Injectable()
export class UserService {
    constructor() {}

    async create(createUserDto: any): Promise<any> {
        let res;
        try {
            const user = await prisma.user.create({
                data: {
                    ...createUserDto
                }
            })
            console.log("user", user);
            res = true
        } catch (e) {
            res = false
        }
        return {data: res}
    }

}
