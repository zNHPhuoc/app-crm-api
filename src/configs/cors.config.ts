import { INestApplication } from '@nestjs/common';

export const corsConfig = (app: INestApplication): void => {
  const origins = ['http://localhost'];

  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
};
