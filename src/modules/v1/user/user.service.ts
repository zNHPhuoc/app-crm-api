import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PopulateOption } from 'mongoose';
import { UserRepositoryInterface } from '../../../repositories/user/user.repository';
import { HashService } from '../../../services/hash.service';
import { ERROR_CODE } from '../../../common/error-code';
import { UserDocument } from '../../../database/schemas/user.schema';

@Injectable()
export class UserService {
  protected populate: PopulateOption;

  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepo: UserRepositoryInterface,
    private readonly hashService: HashService,
  ) {
    this.populate = [
      {
        path: 'roles',
        select: 'name code permissions',
        populate: { path: 'permissions', select: 'name code' },
      },
      {
        path: 'team',
        select: 'name description',
      },
    ] as PopulateOption;
  }

  async findById(id: string): Promise<UserDocument> {
    try {
      const populate = this.populate;

      const user = await this.userRepo.findByIdWithSubFields(id, { populate });

      if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (e) {
      throw e;
    }
  }
}
