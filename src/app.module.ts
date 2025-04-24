import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/v1/auth/auth.module';
import { UserModule } from './modules/v1/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './modules/global/logger/logger.module';
import { AppLoggerService } from './modules/global/logger/logger.service';
import { JwtService } from '@nestjs/jwt';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { StandardResponseMiddleware } from './middlewares/standard-response.middleware';
import { DatabaseModule } from './modules/global/database/database.module';
import { LoggingInterceptorFilter } from './filters/logging-interceptor.filter';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    DatabaseModule,
    LoggerModule,
    AuthModule,
    UserModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptorFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
    AppService,
    JwtService,
    AppLoggerService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(StandardResponseMiddleware).forRoutes('*');
  }
}
