import { Injectable } from '@nestjs/common';
import {prisma} from "@addrop/database";
import {Keypair} from "@solana/web3.js";
import {preferenceList} from "../../constants/preference";
import {rewardList} from "../../constants/reward";

@Injectable()
export class CampaignService {
    constructor() {}

    async create(createCampaignDto: any) {
        let res: string | null;
        try {
            // could just send these over as strings
            createCampaignDto.userGroups = createCampaignDto.userGroups.map(
                (userGroup: any) => {
                    return preferenceList[userGroup]
                }
            )
            createCampaignDto.rewardType = rewardList[createCampaignDto.rewardType]

            const campaign = await prisma.campaign.create({
                data: {
                    ...createCampaignDto
                }
            })

            const escrowKeypair = Keypair.generate();
            res = escrowKeypair.publicKey.toString()
            console.log("asf", campaign);
        } catch (e) {
            console.log("e company", e);
            res = null
        }
        return {
            data: {publicKey: res}
        }
    }

}
