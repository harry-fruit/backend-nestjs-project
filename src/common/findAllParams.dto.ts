import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from 'class-validator'

export class FindAllParamsDTO {
    
    @ApiProperty({ type: Number })
    @IsNumber()
    public limit?: number;
    
    @ApiProperty({ type: Number })
    @IsNumber()
    public currentPage?: number;
}