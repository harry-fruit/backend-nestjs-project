import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateProductDTO {
    @ApiProperty({ type: String, description: 'Product name' })
    @IsString()
    @IsOptional()
    public name: string;
    
    @ApiProperty({ type: Number, description: 'Product price' })
    @IsNumber()
    @IsOptional()
    public price: number;
}