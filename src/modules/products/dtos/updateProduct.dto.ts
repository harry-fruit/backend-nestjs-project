import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateProductDTO {
    @ApiProperty({ type: Number, description: 'Product ID' })
    @IsNumber()
    @IsNotEmpty()
    public id: number;


    @ApiProperty({ type: String, description: 'Product name' })
    @IsString()
    @IsOptional()
    public name: string;
    
    @ApiProperty({ type: Number, description: 'Product price' })
    @IsNumber()
    @IsOptional()
    public price: number;
}