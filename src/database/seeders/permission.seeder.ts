import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from '../schemas/permission.schema';
import { IPermission } from '../../@types/permission';
import { Seeder } from 'nestjs-seeder';

@Injectable()
export class PermissionSeeder implements Seeder {
  constructor(
    @InjectModel(Permission.name)
    private readonly permission: Model<Permission>,
  ) {}

  async seed(): Promise<any> {
    const permissions = await this.getPermissions();

    return this.permission.insertMany(permissions);
  }

  async drop(): Promise<any> {
    return this.permission.deleteMany({});
  }

  async getPermissions(): Promise<Array<IPermission>> {
    const permissions: Array<IPermission> = [
      { name: 'User List', code: 'USER_LIST' },
      { name: 'User Detail', code: 'USER_DETAIL' },
      { name: 'User Create', code: 'USER_CREATE' },
      { name: 'User Update', code: 'USER_UPDATE' },
      { name: 'User Delete', code: 'USER_DELETE' },

      { name: 'Role List', code: 'ROLE_LIST' },
      { name: 'Role Detail', code: 'ROLE_DETAIL' },
      { name: 'Role Create', code: 'ROLE_CREATE' },
      { name: 'Role Update', code: 'ROLE_UPDATE' },
      { name: 'Role Delete', code: 'ROLE_DELETE' },

      { name: 'Permission List', code: 'PERMISSION_LIST' },
      { name: 'Permission Detail', code: 'PERMISSION_DETAIL' },
      { name: 'Permission Create', code: 'PERMISSION_CREATE' },
      { name: 'Permission Update', code: 'PERMISSION_UPDATE' },
      { name: 'Permission Delete', code: 'PERMISSION_DELETE' },
    ];

    const permissionsInDb = await this.permission.find({});

    return permissions.filter((permission: IPermission) => {
      return !permissionsInDb.find((p) => p.code === permission.code);
    });
  }
}
