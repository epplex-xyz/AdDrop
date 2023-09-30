import { IsObject, IsString } from 'class-validator';

export class CreatePriceDto {
    @IsString()
    currency: string;

    @IsString()
    description: string;

    @IsString()
    name: string;

    @IsString()
    product: string;

    @IsObject()
    recurring: object;

    @IsString()
    unitAmountDecimal: number;
}
