import { IsNumber, IsOptional, IsString } from 'class-validator';

type Direction = 'ASC' | 'DESC';
export class GetProductParams {
    @IsOptional()
    @IsString()
    startDate?: string;

    @IsOptional()
    @IsString()
    endDate?: string;

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    sort?: string;

    @IsOptional()
    @IsString()
    direction?: Direction;
}
