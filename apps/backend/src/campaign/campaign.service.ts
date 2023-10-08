import { Injectable } from '@nestjs/common';
import {prisma} from "@addrop/database";
import {Keypair} from "@solana/web3.js";

@Injectable()
export class CampaignService {
    constructor() {}

    async create(createCompanyDto: any) {
        // check if user exists
        let res;
        let escrowKeypair;
        try {

            console.log("createCompanyDto", createCompanyDto);
            escrowKeypair = Keypair.generate();
            // const company = await prisma.company.create({
            //     data: {
            //         ...createCompanyDto
            //     }
            // })
            // console.log("company", company);
            res = true
        } catch (e) {
            console.log("e company", e);
            res = false
        }
        return {
            data: {publicKey: escrowKeypair.publicKey.toString()}
        }
    }

}
