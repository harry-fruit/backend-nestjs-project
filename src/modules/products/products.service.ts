import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllParamsDTO } from 'src/common/findAllParams.dto';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/createProduct.dto';
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

    public async findAll(findAllParamsDTO: FindAllParamsDTO) {
        const { limit, currentPage } = findAllParamsDTO;
        const offset = limit * (currentPage - 1);

        const response = await this.productsRepository.find({ skip: offset, take: limit || 10 });
        return response;
    }
}
