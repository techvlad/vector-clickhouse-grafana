import { Injectable } from '@nestjs/common';
import { Logger } from './logger';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {}
  getHello(): string {
    this.logger.log('Inside getHello', { companyId: 10, userId: 42 });
    return 'Hello World!';
  }
}
