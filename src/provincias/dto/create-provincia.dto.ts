import { IsDefined, IsString, MinLength } from 'class-validator';

export class CreateProvinciaDto {

  @IsString()
  @IsDefined()
  @MinLength(3)
  nombre: string;

  createdAt: Date;

  updatedAt?: Date;
}
