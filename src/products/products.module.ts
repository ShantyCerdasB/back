import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepositoryImpl } from './repository/products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepositoryImpl],
})
export class ProductsModule {}
