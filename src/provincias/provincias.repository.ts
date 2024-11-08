import { Injectable } from '@nestjs/common';
import {
  AttributeValue,
  DeleteItemCommand,
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { Provincia } from './entities/provincia.entity';
import { env } from 'process';

/**
 * Contiene la logica para interactuar con la base de datos
 * @author dgutierrez
 */
@Injectable()
export class ProvinciasRepository {
  private readonly tableName = 'provincias';
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({ region: env.AWS_REGION });
  }

  /**
   * Obtiene todas las provincias
   * @returns
   */
  async findAll() {
    const result: Provincia[] = [];

    const command = new ScanCommand({
      TableName: this.tableName,
    });

    const response = await this.client.send(command);

    if (response.Items) {
      response.Items.forEach((item) => {
        result.push(Provincia.newInstanceFromDynamoDBItem(item));
      });
    }

    return result;
  }

  async insertOne(provincia: Provincia) {
    const itemObject = this.createItemObject(provincia);

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: itemObject,
    });

    await this.client.send(command);

    return provincia;
  }

  async updateOne(provincia: Provincia) {
    const itemObject = this.createItemObject(provincia);

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: itemObject,
    });

    await this.client.send(command);

    return provincia;
  }

  async deleteOne(provinciaId: string) {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: {
        provinciaId: { S: provinciaId },
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_OLD',
    });

    const response = await this.client.send(command);

    if (response.Attributes) {
      return true;
    }
    return false;
  }

  async findOne(provinciaId: string) {
    const command = new ScanCommand({
      TableName: this.tableName,
      FilterExpression: 'provinciaId = :provinciaId',
      ExpressionAttributeValues: {
        ':provinciaId': { S: provinciaId },
      },
    });

    const response = await this.client.send(command);

    if (response.Items && response.Items.length > 0) {
      return Provincia.newInstanceFromDynamoDBItem(response.Items[0]);
    }

    return null;
  }

  private createItemObject(provincia: Provincia) {
    const itemObject: Record<string, AttributeValue> = {
      provinciaId: { S: provincia.id },
      nombre: { S: provincia.nombre },
      createdAt: { N: provincia.createdAt.getTime().toString() },
    };

    if (provincia.updatedAt) {
      itemObject.updatedAt = { N: provincia.updatedAt.getTime().toString() };
    }

    return itemObject;
  }
}
