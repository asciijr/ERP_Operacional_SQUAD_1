import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' });
  // Valida todos os DTOs de entrada (class-validator) e remove campos não declarados
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  // Contratos da API (OpenAPI) disponíveis em http://localhost:3000/docs
  const config = new DocumentBuilder()
    .setTitle('ERP Operacional - API')
    .setDescription('API do ERP Operacional (Squad 1 - ASCII)')
    .setVersion('0.1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

  await app.listen(Number(process.env.PORT ?? 3000), '0.0.0.0');
}

void bootstrap();
