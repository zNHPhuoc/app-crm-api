import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { join } from 'path';
import { setupSwagger } from './configs/swagger.config';
import { EventEmitter } from 'events';
import { corsConfig } from './configs/cors.config';
import { useContainer } from 'class-validator';
import { AllExceptionFilter } from './filters/all-exception.filter';
config();

EventEmitter.defaultMaxListeners = 1000;

async function bootstrap() {
  const { APP_PORT, APP_HOST, APP_PREFIX } = process.env;

  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule, {
      bufferLogs: true,
    });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // set public path
  const publicPath = join(__dirname, '../../public/');
  app.useStaticAssets(publicPath, {
    prefix: '/public/',
  });

  corsConfig(app); // cors

  app.setGlobalPrefix(APP_PREFIX); // set global prefix

  app.useGlobalPipes(new ValidationPipe({ transform: true })); // set global validation pipe

  app.useGlobalFilters(new AllExceptionFilter()); // set global interceptor

  setupSwagger(app); // swagger

  await app.listen(APP_PORT, async () => {
    Logger.log(`API Swagger: ${APP_HOST}${APP_PREFIX}/`);
    console.log(`Server running at: ${APP_HOST}:${APP_PORT}${APP_PREFIX}`);
  });
}

bootstrap();
