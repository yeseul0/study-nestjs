import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global ValidationPipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 속성 제거
      forbidNonWhitelisted: true, // DTO에 없는 속성 있으면 에러
      transform: true, // 자동 타입 변환 (string -> number 등)
      transformOptions: {
        enableImplicitConversion: true, // 암묵적 타입 변환 활성화
      },
    }),
  );

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS 학습용 API 문서')
    .setVersion('1.0')
    .addTag('users', '사용자 관리 API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Swagger documentation: http://localhost:3000/api`);
}
bootstrap();
