import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppLoggerService } from '../../global/logger/logger.service';
import { JwtModule } from '@nestjs/jwt';
import { HashService } from '../../../services/hash.service';
import { DatabaseModule } from '../../global/database/database.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.EXPIRES_IN },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, HashService, AppLoggerService],
  exports: [AuthService],
})
export class AuthModule {}
