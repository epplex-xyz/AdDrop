import { Injectable } from '@nestjs/common';
import {prisma} from "@addrop/database";

@Injectable()
export class CompanyService {
    constructor() {}

    async create(createCompanyDto: any) {
        let res;
        try {
            console.log("createCompanyDto", createCompanyDto);
            const company = await prisma.company.create({
                data: {
                    ...createCompanyDto
                }
            })
            console.log("company", company);
            res = true
        } catch (e) {
            console.log("e company", e);
            res = false
        }
        return {data: res}
    }

}
