import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CustomGuardException } from '../pipes/custom-guard-exception.pipe';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const { SECRET_KEY } = process.env;

    const request = context.switchToHttp().getRequest();

    const token = AuthGuard.extractTokenFromHeader(request);

    if (!token) {
      throw new CustomGuardException();
    }
    try {
      const verify = await this.jwtService.verifyAsync(token, {
        secret: SECRET_KEY,
      });
      await this.canAccess(verify.sub);

      request.user = verify;

      return true;
    } catch (e) {
      throw new CustomGuardException();
    }
  }

  private static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async canAccess(id: string) {
    return true;
    /*const user = await this.userService.findById(id);
    if (!user || user.status !== USER_STATUS.ACTIVE) {
      throw new CustomGuardException();
    }
    return user;*/
  }
}
