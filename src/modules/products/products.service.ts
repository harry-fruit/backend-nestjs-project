import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllParamsDTO } from 'src/common/findAllParams.dto';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProductDTO } from './dtos/createProduct.dto';
import { UpdateProductDTO } from './dtos/updateProduct.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product> 
    ){}

    public async create(createProductDTO:CreateProductDTO): Promise<Product> {
        const product: Product = await this.productsRepository.save(createProductDTO);
        return product
    }

    public async findAll(findAllParamsDTO: FindAllParamsDTO): Promise<Product[]> {
        const { limit, currentPage } = findAllParamsDTO;
        const offset = limit * (currentPage - 1);

        const response: Product[] = await this.productsRepository.find({ skip: offset, take: limit || 10 });
        return response;
    }

    public async findById(id:number): Promise<Product> {
        const product: Product = await this.productsRepository.findOne(id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

    public async update(updateProductDTO: UpdateProductDTO): Promise<UpdateResult> {
        const { id, ...payload } = updateProductDTO;
        
        const response: UpdateResult = await this.productsRepository.update(id, payload);
        return response;
    }
}
