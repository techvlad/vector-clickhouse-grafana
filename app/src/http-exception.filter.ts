import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { BaseHttpResponse } from './shared/base';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly asyncContext: AsyncContext) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const statusCode = exception.getStatus();
    const message = exception.getResponse();
    const traceId = this.asyncContext.get<string, string>('traceId');

    reply.status(statusCode);

    if (typeof message === 'object') {
      return reply.send({ ...message, traceId });
    }

    const exceptionResponsePayload: BaseHttpResponse = {
      statusCode,
      message,
      traceId,
    };

    reply.code(statusCode).send(exceptionResponsePayload);
  }
}
