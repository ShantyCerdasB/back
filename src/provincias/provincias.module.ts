import { Module } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { ProvinciasController } from './provincias.controller';
import { ProvinciasRepository } from './provincias.repository';

@Module({
  controllers: [ProvinciasController],
  providers: [ProvinciasService, ProvinciasRepository],
})
export class ProvinciasModule {}
