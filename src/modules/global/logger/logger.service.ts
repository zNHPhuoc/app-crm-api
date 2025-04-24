import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  Scope,
} from '@nestjs/common';
import { createLogger } from 'winston';
import { defineTransport } from '../../../utils/transport';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService extends ConsoleLogger implements LoggerService {
  private logger = createLogger({
    transports: [...defineTransport()],
  });

  error(message: any, trace?: string, context?: string) {
    this.logger.error(message, { trace });
    super.error(message, JSON.stringify(trace), context);
  }

  warn(message: any, context?: string) {
    this.logger.warn(message, { context });
    super.warn(JSON.stringify(message), JSON.stringify(context));
  }

  log(message: any, context?: string) {
    this.logger.info(JSON.stringify(message), { context });
    super.log(JSON.stringify(message), JSON.stringify(context));
  }

  debug(message: any, context?: string) {
    this.logger.debug(message, { context });
    super.debug(message, context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
  }
}
