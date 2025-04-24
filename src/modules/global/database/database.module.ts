import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../database/schemas/user.schema';
import { Role, RoleSchema } from '../../../database/schemas/role.schema';
import {
  Permission,
  PermissionSchema,
} from '../../../database/schemas/permission.schema';
import { UserRepository } from '../../../repositories/user/user.interface.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [{ provide: 'UserRepositoryInterface', useClass: UserRepository }],
  exports: [
    MongooseModule,
    { provide: 'UserRepositoryInterface', useClass: UserRepository },
  ],
})
export class DatabaseModule {}
