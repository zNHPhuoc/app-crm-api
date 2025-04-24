import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomPermissionException extends HttpException {
  constructor() {
    super(
      {
        status: false,
        message: 'FORBIDDEN',
        statusCode: HttpStatus.FORBIDDEN,
        data: null,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
