import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const morgan = require('morgan');

  //Logear todo, ip, metodo, url, status, tiempo de respuesta
  app.use(morgan('common'));

  //versionamiento de la api
  app.setGlobalPrefix('CafeDonEmilioWS/api');

  await app.listen(3000);
}
bootstrap();
