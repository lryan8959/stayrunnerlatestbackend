import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Adjust CORS settings as needed
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000); // Use the default port or set it via environment variables
}

bootstrap();
