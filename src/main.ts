import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties not in DTO
      forbidNonWhitelisted: true, // throws error if unknown properties sent
      transform: true, // auto-transform payloads to DTO instances
    })
  );
  app.enableCors({
    origin: 'http://localhost:5173', // frontend origin
    credentials: true,               // if using cookies/auth
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
