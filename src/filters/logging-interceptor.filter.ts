import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppLoggerService } from '../modules/global/logger/logger.service';

@Injectable()
export class LoggingInterceptorFilter implements NestInterceptor {
  constructor(private readonly appLoggerService: AppLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context?.switchToHttp()?.getRequest();
    const { originalUrl, method, query, body, headers, ip } = req;

    const request = !this.isEmpty(query)
      ? JSON.stringify(query)
      : JSON.stringify(body);

    const userAgent = headers['user-agent'];
    const userDevice = headers['user-device'];

    if (method == 'GET') return next.handle();
    const payload = {
      auth:
        req['user'] && req['user']['email']
          ? req['user']['email'] || req['user']['id']
          : 'anonymous',
      originalUrl,
      userAgent,
      userDevice,
      ip,
      request,
    };

    this.appLoggerService.warn(payload, originalUrl);

    return next.handle();
  }

  private isEmpty(obj: any): boolean {
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return true;
  }
}
