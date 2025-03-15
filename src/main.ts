import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties that are not in the DTO
      transform: true, // Automatically transform payloads to DTO objects
      forbidNonWhitelisted: true // Throw error if non-whitelisted properties are present
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
