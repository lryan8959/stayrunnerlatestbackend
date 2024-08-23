import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Adjust CORS settings as needed
  });

  app.useGlobalPipes(new ValidationPipe());

  // Use default port provided by Vercel or port 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
