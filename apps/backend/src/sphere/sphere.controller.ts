import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SphereService } from './sphere.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiTags('Sphere')
@Controller('sphere')
export class SphereController {
    constructor(private readonly sphereService: SphereService) {}

    @ApiBody({ type: CreatePriceDto })
    @Post('price/create')
    async createPrice(@Body() createPriceDto: CreatePriceDto): Promise<void> {
        return await this.sphereService.createPrice(createPriceDto);
    }

    @Delete('product/delete/:id')
    async deleteProduct(@Param('id') id: string) {
        return await this.sphereService.deleteProduct(id);
    }

    @Post('payment/create')
    // why cannot do CreatePaymentDto here?
    async createPayment(@Body() createPaymentDto: any) {
        // console.debug('createPaymentDto', createPaymentDto);
        return await this.sphereService.createPayment(createPaymentDto);
    }
}
