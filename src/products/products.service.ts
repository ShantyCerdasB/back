import { Injectable } from '@nestjs/common';

import { ProductsRepositoryImpl } from './repository/products.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepositoryImpl) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }
}
