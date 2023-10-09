import {Body, Controller, Post} from '@nestjs/common';
import {CampaignService} from './campaign.service';

@Controller("campaign")
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) {}

    @Post('create')
    async create(
        @Body() createCampaign: any,
    ): Promise<{data: any}> {
        return await this.campaignService.create(createCampaign);
    }

    @Post('finalise')
    async finalise(
        @Body() finaliseCampaign: any,
    ): Promise<{data: any}> {
        return await this.campaignService.finalise(finaliseCampaign);
    }
}
