import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppLoggerService } from '../../global/logger/logger.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';
import { fullPath } from '../../../utils/router';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: AppLoggerService,
  ) {
    this.logger.setContext('AuthController');
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(
    @Body() authLoginDto: AuthLoginDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    try {
      const response = await this.authService.login(authLoginDto);
      this.logger.log(JSON.stringify(response), fullPath(req));
      return res.locals.standardResponse(response);
    } catch (e) {
      this.logger.error(`Login error ${JSON.stringify(authLoginDto)}`, e);
      return res.locals.standardResponse(null, e);
    }
  }

}
