import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AsyncHooksModule } from '@nestjs-steroids/async-context';
import { EnvironmentModule } from '@nestjs-steroids/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppEnvironment, appEnvironment } from './app.environment';
import { LoggerModule } from './logger';
import { HttpExceptionFilter } from './http-exception.filter';
import { HttpLoggingInterceptor } from './http-logging.interceptor';

@Module({
  imports: [
    AsyncHooksModule,
    EnvironmentModule.forRoot({
      isGlobal: true,
      useClass: AppEnvironment,
      useValue: appEnvironment,
    }),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
