import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { join } from 'path';
import { setupSwagger } from './configs/swagger.config';
import { EventEmitter } from 'events';
config();

EventEmitter.defaultMaxListeners = 1000;

async function bootstrap() {
  const { APP_PORT, APP_HOST, APP_PREFIX } = process.env;

  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule, {
      bufferLogs: true,
    });

  // set public path
  const publicPath = join(__dirname, '../../public/');
  app.useStaticAssets(publicPath, {
    prefix: '/public/',
  });

  // set cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  // set global prefix
  app.setGlobalPrefix(APP_PREFIX);

  // set global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // swagger
  setupSwagger(app);

  await app.listen(APP_PORT, async () => {
    Logger.log(`API Swagger: ${APP_HOST}${APP_PREFIX}/`);
    console.log(`Server running at: ${APP_HOST}:${APP_PORT}${APP_PREFIX}`);
  });
}

bootstrap();
