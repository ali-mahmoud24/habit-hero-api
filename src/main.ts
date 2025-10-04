import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Security
  app.use(helmet());
  app.enableCors({ origin: true });

  // ✅ Validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // strips properties not in DTO
      forbidNonWhitelisted: true,   // throws error if unknown property is sent
      transform: true,              // auto-transform payloads to DTO classes
    }),
  );

  // ✅ Global response formatting (serialization / DTO mapping)
  app.useGlobalInterceptors(new TransformInterceptor());

  // ✅ Global exception filter (centralized error handling)
  app.useGlobalFilters(new AllExceptionsFilter());

  // ✅ Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Habit Hero API')
    .setDescription('Gamified habit tracker API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
