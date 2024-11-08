import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { env } from 'process';

import { IProductsRepository } from './repository.interface';

/**
 * Repository for the implementation of the products with the database dynamoDB
 * @author dgutierrez
 */
@Injectable()
export class ProductsRepositoryImpl implements IProductsRepository {
  private readonly tableName = 'products';
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({ region: env.AWS_REGION });
  }

  /**
   * Get all products form the database
   * @returns {Promise<Product[]>} All products
   */
  async findAll() {
    const result: Product[] = [];

    const command = new ScanCommand({
      TableName: this.tableName,
    });

    const response = await this.client.send(command);

    if (response.Items) {
      response.Items.forEach((item) => {
        result.push(Product.newInstanceFromDynamoDBItem(item));
      });
    }

    return result;
  }
}
