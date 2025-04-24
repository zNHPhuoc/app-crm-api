import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Role } from '../schemas/role.schema';

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(
    @InjectModel(Role.name)
    private readonly role: Model<Role>,
  ) {}

  async seed(): Promise<any> {
    const roles = [
      {
        name: 'sa',
        code: 'SA',
      },
      {
        name: 'admin',
        code: 'ADMIN',
      },
      {
        name: 'user',
        code: 'USER',
      },
    ];

    const rolesInDb = await this.role.find({});
    const filteredRoles = roles.filter((role) => {
      return !rolesInDb.find((r) => r.code === role.code);
    });

    return this.role.insertMany(filteredRoles);
  }

  async drop(): Promise<any> {
    return this.role.deleteMany({});
  }
}
