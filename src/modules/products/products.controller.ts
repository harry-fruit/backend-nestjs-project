import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FindAllParamsDTO } from 'src/common/findAllParams.dto';
import { CreateProductDTO } from './dtos/createProduct.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ){}
    
    @Post('create')
    @ApiOperation({ summary: 'Create Product'})
    @ApiOkResponse({ status: 201, description: 'Created successfully' })
    @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized.' })
    @ApiInternalServerErrorResponse({ status: 500, description: "There's some problem with the server." })
    public async createProduct(
        @Body() createProductDTO:CreateProductDTO
        ): Promise<Product>{
            try {
                const response: Product = await this.productsService.create(createProductDTO);
                return response;
            } catch (error){
                throw new Error(`An error just happen! \nMore Details: ${error}`)
        }
    }
    
    @Get('all-products')
    @ApiOperation({ summary: 'Find All Products'})
    @ApiOkResponse({ status: 201, description: 'Finded successfully' })
    @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized.' })
    @ApiInternalServerErrorResponse({ status: 500, description: "There's some problem with the server." })
    public async findAllProducts(
        @Query()
        findOptions: FindAllParamsDTO,
    ): Promise<Product[]>{
        try {
            const response: Product[] = await this.productsService.findAll(findOptions);
            return response;
        } catch (error){
            throw new Error(`An error just happen! \nMore Details: ${error}`)
        }
    }
}
