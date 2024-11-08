import { v4 as uuidv4 } from 'uuid';
import { CreateProvinciaDto } from '../dto/create-provincia.dto';
import { UpdateProvinciaDto } from '../dto/update-provincia.dto';

export class Provincia {
  id: string;
  nombre: string;
  createdAt: Date;
  updatedAt?: Date;

  static newInstanceFromCreateProvinciaDto(createProvinciaDto: CreateProvinciaDto): Provincia {
    const result = new Provincia();

    result.id = uuidv4();
    result.nombre = createProvinciaDto.nombre;
    result.createdAt = new Date();

    return result;
  }

  /**
   * Crea una nueva instancia de Provincia a partir de un item de DynamoDB
   * @param item Item de DynamoDB
   * @returns Instancia de Provincia
   * @author dgutierrez
   */
  static newInstanceFromDynamoDBItem(item: any): Provincia {
    const provincia = new Provincia();
    provincia.id = item.provinciaId.S;
    provincia.nombre = item.nombre.S;
    provincia.createdAt = new Date(Number(item.createdAt.N));

    if (item.updatedAt) {
      provincia.updatedAt = new Date(Number(item.updatedAt.N));
    }
    return provincia;
  }
}
