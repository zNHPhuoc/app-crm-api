import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../database/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../../../services/hash.service';
import { UserRepository } from '../../../repositories/user/user.interface.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    { provide: 'UserRepositoryInterface', useClass: UserRepository },
    JwtService,
    UserService,
    HashService,
  ],
})
export class UserModule {}
