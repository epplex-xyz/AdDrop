import {Body, Controller, Post} from '@nestjs/common';
import {CompanyService} from './company.service';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post('create')
    async create(
        @Body() createCompanyDto: any,
    ): Promise<{data: boolean}> {
        return await this.companyService.create(createCompanyDto);
    }
}
