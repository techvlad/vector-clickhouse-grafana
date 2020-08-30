import { Module, Global, Provider } from '@nestjs/common';
import { Logger } from './logger';
import { AppEnvironment } from 'src/app.environment';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { NodeEnv } from 'src/shared/enums';
import { productionConfig, developmentConfig } from './config';

const loggerProvider: Provider = {
  provide: Logger,
  inject: [AppEnvironment, AsyncContext],
  useFactory(
    appEnvironment: AppEnvironment,
    asyncContext: AsyncContext,
  ): Logger {
    const loggerConfig =
      appEnvironment.nodeEnv === NodeEnv.Production
        ? productionConfig
        : developmentConfig;

    return new Logger(
      () => asyncContext.get<string, string>('traceId'),
      loggerConfig,
    );
  },
};

@Global()
@Module({
  providers: [loggerProvider],
  exports: [loggerProvider],
})
export class LoggerModule {}
