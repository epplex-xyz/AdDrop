import { Injectable } from '@nestjs/common';
import {prisma} from "@addrop/database";
import {Connection, Keypair} from "@solana/web3.js";
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
            // escrow keypair and pubkey should be stored already
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

    async finalise(finaliseCampaign: any) {
        let res: string | null;
        try {
            // could just send these over as strings
            console.log("fina", finaliseCampaign);
            const connection = new Connection("https://api.devnet.solana.com")
            const txId = await connection.sendRawTransaction(finaliseCampaign.serialisedTx, {skipPreflight: true});

            console.log("ts",txId)
            const res = (
                await connection.confirmTransaction(
                    {
                        signature: txId,
                        blockhash: finaliseCampaign.blockhash.blockhash,
                        lastValidBlockHeight: finaliseCampaign.blockhash.lastValidBlockHeight,
                    },
                    "confirmed"
                )
            );

            console.log("res", res)
            // const campaign = await prisma.campaign.create({
            //     data: {
            //         ...createCampaignDto
            //     }
            // })
            // // escrow keypair and pubkey should be stored already
            // const escrowKeypair = Keypair.generate();
            // res = escrowKeypair.publicKey.toString()
            // console.log("asf", campaign);
        } catch (e) {
            console.log("e company", e);
            res = null
        }
        return {
            data: {publicKey: res}
        }
    }
}
