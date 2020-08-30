import * as pino from 'pino';
import { LoggerService } from '@nestjs/common';

type TraceIdGetterFunc = () => string;

export class Logger implements LoggerService {
  private readonly pino: pino.Logger;

  constructor(
    private readonly traceIdGetterFunc: TraceIdGetterFunc,
    optionsOrStream?: pino.LoggerOptions | pino.DestinationStream,
  ) {
    this.pino = pino(optionsOrStream);
  }

  get PinoInstance(): pino.Logger {
    return this.pino;
  }

  verbose?(message: any, context?: string | object) {
    const traceId = this.traceIdGetterFunc();
    if (typeof context === 'object') {
      return this.pino.trace({ ...context, traceId }, message);
    }
    return this.pino.trace({ context, traceId }, message);
  }

  debug?(message: any, context?: string | object) {
    const traceId = this.traceIdGetterFunc();
    if (typeof context === 'object') {
      return this.pino.debug({ ...context, traceId }, message);
    }
    return this.pino.debug({ context, traceId }, message);
  }

  log(message: any, context?: string | object) {
    const traceId = this.traceIdGetterFunc();
    if (typeof context === 'object') {
      return this.pino.info({ ...context, traceId }, message);
    }
    return this.pino.info({ context, traceId }, message);
  }

  warn(message: any, context?: string | object) {
    const traceId = this.traceIdGetterFunc();
    if (typeof context === 'object') {
      return this.pino.warn({ ...context, traceId }, message);
    }
    return this.pino.warn({ context, traceId }, message);
  }

  error(message: any, stack?: string, context?: string | object) {
    const traceId = this.traceIdGetterFunc();
    if (typeof context === 'object') {
      return this.pino.error({ ...context, traceId, message, stack }, message);
    }
    return this.pino.error({ context, traceId, message, stack }, message);
  }

  static getBootstrapLogger(
    optionsOrStream?: pino.LoggerOptions | pino.DestinationStream,
  ): Logger {
    return new Logger(
      () => '00000000-0000-0000-0000-000000000000',
      optionsOrStream,
    );
  }
}
