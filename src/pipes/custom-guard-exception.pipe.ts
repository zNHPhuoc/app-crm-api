import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomGuardException extends HttpException {
  constructor() {
    super(
      {
        status: false,
        message: 'UNAUTHORIZED',
        statusCode: HttpStatus.UNAUTHORIZED,
        data: null,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
