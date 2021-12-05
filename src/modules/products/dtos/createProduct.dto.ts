import { ApiProperty } from "@nestjs/swagger";
import { ProductInterface } from "../interfaces/product.interface";
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDTO implements ProductInterface{
    
    @ApiProperty({ type: String, description: 'Product name' })
    @IsString()
    @IsNotEmpty()
    public name: string;

    @ApiProperty({ type: Number, description: 'Product price' })
    @IsNumber()
    @IsNotEmpty()
    public price: number;
}