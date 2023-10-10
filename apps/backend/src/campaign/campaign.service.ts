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
        let campaignId: number | null;
        try {
            // could just send these over as strings
            createCampaignDto.userGroups = createCampaignDto.userGroups.map(
                (userGroup: any) => {
                    return preferenceList[userGroup]
                }
            )
            createCampaignDto.rewardType = rewardList[createCampaignDto.rewardType]
            const escrowKeypair = Keypair.generate();
            res = escrowKeypair.publicKey.toString()
            const campaign = await prisma.campaign.create({
                data: {
                    ...createCampaignDto,
                    escrowPubkey: escrowKeypair.publicKey.toString(),
                    escrowPrivatekey: escrowKeypair.secretKey.toString(),
                }
            })

            campaignId = campaign.id
            console.log("result", campaign);
        } catch (e) {
            console.log("e company", e);
            res = null
        }

        return {
            data: {publicKey: res, campaignId: campaignId}
        }
    }

    async finalise(finaliseCampaign: any) {
        let res: boolean = false;
        try {
            console.log("fina", finaliseCampaign);
            const connection = new Connection("https://api.devnet.solana.com")
            const txId = await connection.sendRawTransaction(finaliseCampaign.serialisedTx, {skipPreflight: true});

            const txRes = (
                await connection.confirmTransaction(
                    {
                        signature: txId,
                        blockhash: finaliseCampaign.blockhash.blockhash,
                        lastValidBlockHeight: finaliseCampaign.blockhash.lastValidBlockHeight,
                    },
                    "confirmed"
                )
            );
            console.log("res", txRes)
            if (txRes.value.err !== null) {
                throw txRes.value.err;
            }

            const campaign = await prisma.campaign.update({
                where: {
                    id: finaliseCampaign.campaignId
                },
                data: {
                    isPaid: true,
                    paidTx: txId,
                    paidTimestamp: new Date(),
                    tokenAddress: finaliseCampaign.tokenAddress,
                    tokenAmount: finaliseCampaign.tokenAmount,
                    usdAmount: finaliseCampaign.usdAmount,
                    payer: finaliseCampaign.payer,
                }
            })
            console.log("campagin", campaign);
            res = true
        } catch (e) {
            console.log("e company", e);
        }

        return {
            data: {result: res}
        }
    }
}
