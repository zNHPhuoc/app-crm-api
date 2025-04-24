import { BaseRepositoryAbstract } from '../base.abstract.repository';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { Model, PopulateOptions } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserRepositoryInterface } from './user.repository';

export class UserRepository
  extends BaseRepositoryAbstract<UserDocument>
  implements UserRepositoryInterface
{
  protected populateOptions: PopulateOptions[] = [
    {
      path: 'roles',
      select: 'name code permissions',
      populate: { path: 'permissions', select: 'name code' },
    },
  ];

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async findByEmail(
    email,
    isPassword = false,
  ): Promise<UserDocument | undefined | any> {
    const populate = this.populateOptions;

    if (!isPassword) {
      return await this.userModel
        .findOne({ email, deletedAt: null })
        .populate(populate)
        .exec();
    }
    return await this.userModel
      .findOne({ email, deletedAt: null })
      .select('+password')
      .populate(populate)
      .exec();
  }

  async updateRefreshToken({ id, refreshToken }): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { id, refreshToken },
      {
        new: true,
      },
    );
  }

  async findWithPasswordById({ id }): Promise<UserDocument | undefined | any> {
    return await this.userModel
      .findOne({ _id: id, deletedAt: null })
      .select('+password')
      .lean()
      .exec();
  }

  async findByIdWithSubFields(
    id: string,
    options: {
      populate?: string[] | PopulateOptions | PopulateOptions[];
    },
  ): Promise<UserDocument> {
    const item = await this.userModel
      .findById(id)
      .populate(options?.populate)
      .exec();
    return item?.deletedAt ? null : item;
  }

  async findOneWithRefreshToken(id: string): Promise<UserDocument> {
    return await this.userModel
      .findOne({ _id: id, deletedAt: null })
      .select('+refreshToken')
      .exec();
  }
}
