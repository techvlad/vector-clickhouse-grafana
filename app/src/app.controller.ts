import {
  Controller,
  Get,
  InternalServerErrorException,
  BadGatewayException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from './logger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  getError(): void {
    this.logger.warn('Will be an error');
    throw new InternalServerErrorException('Unhandled exception');
  }

  @Get('error502')
  getError502(): void {
    throw new BadGatewayException('Bad gateway');
  }
}
