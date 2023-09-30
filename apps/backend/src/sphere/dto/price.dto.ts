import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsObject,
    IsString,
} from 'class-validator';

export class PriceDto {
    @IsString()
    id: string;

    @IsBoolean()
    active: boolean;

    @IsString()
    billingScheme: string;

    @IsDateString()
    created: string;

    @IsString()
    currency: string;

    @IsString()
    description: string;

    @IsString()
    lookupKey: string;

    @IsObject()
    meta: object;

    @IsString()
    name: string;

    @IsString()
    network: string;

    @IsString()
    product: string;

    @IsObject()
    recurring: object;

    @IsString()
    taxBehavior: string;

    // ad corret type
    @IsArray()
    tiers: object[];

    @IsString()
    tierType: string;

    @IsString()
    unitAmountDecimal: number;

    @IsString()
    type: string;

    @IsDateString()
    updated: string;
}
