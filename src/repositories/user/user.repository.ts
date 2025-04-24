import { BaseRepositoryInterface } from '../base.interface.repository';
import { UserDocument } from '../../database/schemas/user.schema';

export interface UserRepositoryInterface
  extends BaseRepositoryInterface<UserDocument> {
  findByEmail(email: string, isPassword?: boolean): Promise<UserDocument | any>;

  updateRefreshToken({
    id,
    refreshToken,
  }: {
    id: string;
    refreshToken: string;
  }): Promise<UserDocument>;

  findWithPasswordById({
    id,
  }: {
    id: string;
  }): Promise<UserDocument | undefined | any>;

  findByIdWithSubFields(
    id: string,
    options: {
      populate?: string[] | any;
    },
  ): Promise<UserDocument>;

  findOneWithRefreshToken(id): Promise<UserDocument>;
}
