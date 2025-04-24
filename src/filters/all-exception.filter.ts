import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    let message = 'ERROR_SYSTEM';
    let error = [];

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      statusCode = exception.getStatus();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const res: any = exceptionResponse;
        message = res.message || message;
        error = res.message instanceof Array ? res.message : [res.message];
      }
    }

    response.status(statusCode).json({
      status: false,
      statusCode,
      message,
      error,
    });
  }
}
