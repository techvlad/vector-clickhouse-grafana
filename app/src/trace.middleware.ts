import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  constructor(private readonly asyncContext: AsyncContext) {}

  use(req: FastifyRequest, res: FastifyReply, next: Function) {
    this.asyncContext.register();
    this.asyncContext.set<string, string>('traceId', uuid());
    next();
  }
}
