import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { ProvinciasRepository } from './provincias.repository';
import { Provincia } from './entities/provincia.entity';

@Injectable()
export class ProvinciasService {

  constructor(private readonly repository: ProvinciasRepository) {
  }

  create(createProvinciaDto: CreateProvinciaDto) {
    return this.repository.insertOne(Provincia.newInstanceFromCreateProvinciaDto(createProvinciaDto));
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    const existingProvincia =  this.repository.findOne(id);

    if (!existingProvincia) {
      throw new NotFoundException(`Provincia with id ${id} not found`);
    }

    return existingProvincia;
  }

  async update(id: string, updateProvinciaDto: UpdateProvinciaDto) {
    const existingProvincia = await this.findOne(id);

    if (updateProvinciaDto.nombre) {
      existingProvincia!.nombre = updateProvinciaDto.nombre;
    }

    updateProvinciaDto.updatedAt = new Date();

    return this.repository.updateOne(existingProvincia!);
  }

  remove(id: string) {
    return this.repository.deleteOne(id);
  }
}
