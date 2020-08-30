import { NestFactory, AbstractHttpAdapter } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger, productionConfig, developmentConfig } from './logger';
import { appEnvironment } from './app.environment';
import { NodeEnv } from './shared/enums';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { TraceMiddleware } from './trace.middleware';

async function bootstrap() {
  const loggerConfig =
    appEnvironment.nodeEnv === NodeEnv.Production
      ? productionConfig
      : developmentConfig;
  const bootstrapLogger = Logger.getBootstrapLogger(loggerConfig);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: bootstrapLogger },
  );

  const asyncContext = app.get(AsyncContext);
  asyncContext.register();
  app.use(new TraceMiddleware(asyncContext).use.bind({ asyncContext }));

  await app.listen(appEnvironment.port, '::', (err: Error, address) => {
    if (err) {
      bootstrapLogger.error(err.message, err.stack);
    }
    bootstrapLogger.log(`The server is running, address: ${address}`);
  });
}
bootstrap();
