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

    async checkAccount(createUserDto: any): Promise<any> {
        let res: string | null;
        try {
            console.log("createUserDto", createUserDto)
            const user = await prisma.user.findUnique({
                where: {
                    id: createUserDto.id
                }
            })

            console.log("user", user);
            const company = await prisma.company.findUnique({
                where: {
                    id: createUserDto.id
                }
            })
            console.log("company", company);

            if (user !== null) {
                res = "profile"
            } else if (company !== null) {
                res = "company"
            } else {
                res = null
            }
        } catch (e) {
            console.log("error", e)
            res = null
        }

        return {data: res}
    }
}
