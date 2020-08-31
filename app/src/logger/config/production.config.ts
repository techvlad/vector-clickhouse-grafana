import { LoggerOptions, stdTimeFunctions } from 'pino';

const productionConfig: LoggerOptions = {
  timestamp: stdTimeFunctions.isoTime,
  redact: {
    paths: ['hostname', 'pid'],
    remove: true,
  },
  messageKey: 'message',
  formatters: {
    level: level => ({ level })
  }
};

export { productionConfig };
