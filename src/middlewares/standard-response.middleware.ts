// standard-response.middleware.ts
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class StandardResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.locals.standardResponse = (data: any = null, error: any = null) => {
      const message = data
        ? 'SUCCESS'
        : error?.status
          ? error?.message
          : 'ERROR_SYSTEM';
      const code = data
        ? HttpStatus.OK
        : (error?.status ??
          (HttpStatus.UNPROCESSABLE_ENTITY ||
            HttpStatus.INTERNAL_SERVER_ERROR));
      const responseBody = {
        status: !!data,
        statusCode: code,
        message: message,
        data: data ?? [],
      };
      res.status(code).json(responseBody);
    };
    next();
  }
}
