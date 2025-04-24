import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../../../services/hash.service';
import { UserRepositoryInterface } from '../../../repositories/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepo: UserRepositoryInterface,
    private readonly jwtService: JwtService,
    private hashService: HashService,
    // @Inject('RoleRepositoryInterface')
    // private readonly roleRepo: RoleRepositoryInterface,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<any> {
    try {
      const { email, password } = authLoginDto;

      const user = await this.userRepo.findByEmail(email, true);

      if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      const checkPassword: boolean = await this.hashService.comparePassword(
        password,
        user.password,
      );

      if (!checkPassword) {
        throw new HttpException(
          'PASSWORD_INCORRECT',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const token: SignPayload = await this.getToken({
        sub: user._id,
        email: user.email,
        username: user.name,
      });

      await this.userRepo.updateRefreshToken({
        id: user._id,
        refreshToken: token.refreshToken,
      });

      const userResponse = user.toObject();
      delete userResponse.password;

      return { token, user: userResponse };
    } catch (e) {
      throw e;
    }
  }

  async getToken(payload: JwtPayload): Promise<SignPayload> {
    const [accessToken, refreshToken] = await Promise.all([
      this.createToken(payload as JwtPayload),
      this.createRefresh(payload as JwtPayload),
    ]);
    return {
      type: 'Bearer',
      accessToken,
      refreshToken,
    };
  }

  async createToken(payload: JwtPayload) {
    const { SECRET_KEY, EXPIRES_IN } = process.env;
    return await this.jwtService.signAsync(payload, {
      secret: SECRET_KEY,
      expiresIn: EXPIRES_IN,
    });
  }

  async createRefresh(payload: any) {
    const { REFRESH_SECRET_KEY, REFRESH_EXPIRES_IN } = process.env;
    return await this.jwtService.signAsync(payload, {
      secret: REFRESH_SECRET_KEY,
      expiresIn: REFRESH_EXPIRES_IN,
    });
  }

  async refresh({ refreshToken, userId }): Promise<SignPayload> {
    try {
      const { REFRESH_SECRET_KEY } = process.env;

      const user = await this.userRepo.findOneWithRefreshToken(userId);

      if (!user || !user?.refreshToken) {
        throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      }

      const verify = await this.jwtService.verifyAsync(refreshToken, {
        secret: REFRESH_SECRET_KEY,
      });
      if (!verify) {
        throw new HttpException('ACCESS_DENIED', HttpStatus.BAD_REQUEST);
      }

      const token: SignPayload = await this.getToken({
        sub: user?._id?.toString(),
        email: user.email,
        username: user.username,
      });

      await this.userRepo.updateRefreshToken({
        id: user._id.toString(),
        refreshToken: token.refreshToken,
      });

      return token;
    } catch (e) {
      throw e;
    }
  }

  async me(id: string): Promise<any> {
    try {
      const populate = [
        {
          path: 'roles',
          select: 'name code permissions',
          populate: { path: 'permissions', select: 'name code' },
        },
        {
          path: 'team',
          select: 'name description',
        },
      ];

      const user = await this.userRepo.findByIdWithSubFields(id, { populate });

      if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (e) {
      throw e;
    }
  }

  async logout(req: any): Promise<any> {
    try {
    } catch (e) {
      throw e;
    }
  }

  async changePassword(authChangePassDto: any, req): Promise<any> {
    try {
      console.log(req.user.sub);
      const user = await this.userRepo.findWithPasswordById({
        id: req.user.sub,
      });
      if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      const payload = {
        currentPassword: authChangePassDto.oldPassword,
        newPassword: authChangePassDto.password,
        repeatNewPassword: authChangePassDto.confirmPassword,
      };
      const verify = await this.hashService.comparePassword(
        payload.currentPassword,
        user.password,
      );
      if (!verify) {
        throw new HttpException(
          'OLD_PASSWORD_INCORRECT',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const password: string = await this.hashService.hashPassword(
        payload.newPassword,
      );

      return await this.userRepo.update(user?._id, {
        password,
      });
    } catch (e) {
      throw e;
    }
  }
}
