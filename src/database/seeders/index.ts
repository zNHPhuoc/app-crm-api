import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { User, UserSchema } from '../schemas/user.schema';
import { Role, RoleSchema } from '../schemas/role.schema';
import { Permission, PermissionSchema } from '../schemas/permission.schema';
import { HashService } from '../../services/hash.service';
import { PermissionSeeder } from './permission.seeder';
import { RoleSeeder } from './role.seeder';
import { UserSeeder } from './user.seeder';

config();

seeder({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [HashService],
}).run([PermissionSeeder, RoleSeeder, UserSeeder]);
