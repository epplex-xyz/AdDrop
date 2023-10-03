import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';

export class ProductDto {
    @IsString()
    name: string;

    @IsBoolean()
    active: boolean;

    @IsString()
    description: string;

    @IsArray()
    @Type(() => String)
    images: string[];

    @IsOptional()
    @Transform(({ value }) =>
        typeof value === 'string' ? parseInt(value, 10) : value,
    )
    maxSupply?: number;

    @IsArray()
    @Type(() => String)
    tags: string[];

    @IsArray()
    @Type(() => Object)
    prices: object[];

    @IsObject()
    meta: object;
}

export class ReturnProductDTO extends ProductDto {
    @IsString()
    id: string;
}
