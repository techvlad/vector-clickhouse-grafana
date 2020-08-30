import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from './logger';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(
    executionContext: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const httpArgumentsHost = executionContext.switchToHttp();
    const request = httpArgumentsHost.getRequest<FastifyRequest>();
    const reply = httpArgumentsHost.getResponse<FastifyReply>();
    const { url, method, query, params, ip } = request;
    const context = 'HttpLoggingInterceptor';
    const loggingContext = {
      context,
      url,
      method,
      query,
      params,
      ip,
      status: undefined,
    };
    const incomeReqMsg = `< ${method} ${url}`;
    const outcomeResMsg = `> ${method} ${url}`;

    this.logger.log(incomeReqMsg, loggingContext);

    return next.handle().pipe(
      tap({
        next: () => {
          loggingContext.status = reply.statusCode;
          this.logger.log(outcomeResMsg, loggingContext);
        },
        error: (error: Error) => {
          let status: number;
          if (error instanceof HttpException) {
            status = error.getStatus();
            loggingContext.status = status;
            if (status >= 400 && status < 500) {
              this.logger.warn(outcomeResMsg, loggingContext);
            } else {
              this.logger.error(outcomeResMsg, error.stack, loggingContext);
            }
          } else {
            loggingContext.status = 500;
            this.logger.error(outcomeResMsg, error.stack, loggingContext);
          }
        },
      }),
    );
  }
}
