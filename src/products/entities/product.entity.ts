/**
 * Product entity
 * @author dgutierrez
 */
export class Product {
  id: number;
  name: string;
  price: number;
  format: string;
  image: string;

  /**
   * Create a new instance of Product from a CreateProductDto
   * @param item Item de DynamoDB
   * @returns {Product} Product instance
   * @author dgutierrez
   */
  static newInstanceFromDynamoDBItem(item: any): Product {
    const product = new Product();
    product.id = item.productId.S;
    product.name = item.name.S;
    product.price = item.price.N;
    product.format = item.format.S;
    product.image = item.image.S;
    return product;
  }
}
