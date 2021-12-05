import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FindAllParamsDTO } from 'src/common/findAllParams.dto';
import { CreateProductDTO } from './dtos/createProduct.dto';
import { UpdateProductDTO } from './dtos/updateProduct.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create Product' })
  @ApiCreatedResponse({ status: 201, description: 'Created successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  public async createProduct(
    @Body() createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    try {
      const response: Product = await this.productsService.create(
        createProductDTO,
      );
      return response;
    } catch (error) {
      throw new Error(`An error just happen! \nMore Details: ${error}`);
    }
  }

  @Get('all-products')
  @ApiOperation({ summary: 'Find All Products' })
  @ApiOkResponse({ status: 201, description: 'Finded successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  public async findAllProducts(
    @Query()
    findOptions: FindAllParamsDTO,
  ): Promise<Product[]> {
    try {
      const response: Product[] = await this.productsService.findAll(
        findOptions,
      );
      return response;
    } catch (error) {
      throw new Error(`An error just happen! \nMore Details: ${error}`);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Product by ID' })
  @ApiOkResponse({ status: 201, description: 'Finded successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  public async findProductById(
    @Param('id')
    id: number,
  ): Promise<Product> {
    try {
      const response: Product = await this.productsService.findById(id);
      return response;
    } catch (error) {
      throw new Error(`An error just happen! \nMore Details: ${error}`);
    }
  }

  @Patch('update')
  @ApiCreatedResponse({ status: 201, description: 'Updated successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  public async updateProduct(
    @Body()
    updateProductDTO: UpdateProductDTO,
  ) {
    try {
      const response = await this.productsService.update(updateProductDTO);
      return response;
    } catch (error) {
      throw new Error(`An error just happen! \nMore Details: ${error}`);
    }
  }
}
