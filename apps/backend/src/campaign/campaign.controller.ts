import {Body, Controller, Post} from '@nestjs/common';
import {CampaignService} from './campaign.service';

@Controller("campaign")
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) {}

    @Post('create')
    async create(
        @Body() createCompanyDto: any,
    ): Promise<{data: boolean}> {
        return await this.campaignService.create(createCompanyDto);
    }
}
