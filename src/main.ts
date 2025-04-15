import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { APP_HOST, APP_PORT } = process.env;
  console.log(APP_HOST, APP_PORT);

  await app.listen(+APP_PORT, async () => {
    const serverUrl: string = await app.getUrl();
    console.log(`Server is running on ${serverUrl}`);
  });
}

bootstrap();
