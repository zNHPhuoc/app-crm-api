import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Role } from '../schemas/role.schema';
import { HashService } from '../../services/hash.service';
import { Seeder } from 'nestjs-seeder';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<User>,
    @InjectModel(Role.name)
    private readonly role: Model<Role>,
    private readonly hashService: HashService,
  ) {}

  async seed(): Promise<any> {
    const roles = await this.role.find().exec();

    const saRole = roles.find((role: Role) => role.code === 'SA');

    const users = [
      {
        username: 'superadmin',
        password: await this.hashService.hashPassword('sa@123'),
        email: 'superadmin@gmail.com',
        phone: '0123456789',
        fullName: 'Super Admin',
        roles: [saRole],
      },
    ];

    return this.user.insertMany(users);
  }

  async drop(): Promise<any> {
    await this.user.deleteMany();
  }
}
