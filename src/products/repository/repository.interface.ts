import { Product } from '../entities/product.entity';

/**
 * Interface for the contract of the products repository
 * @author dgutierrez
 */
export interface IProductsRepository {
  findAll(): Promise<Product[]>;
}
