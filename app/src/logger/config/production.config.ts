import { LoggerOptions, stdTimeFunctions } from 'pino';

const productionConfig: LoggerOptions = {
  timestamp: stdTimeFunctions.isoTime,
  redact: {
    paths: ['hostname', 'pid'],
    remove: true,
  },
  messageKey: 'message',
};

export { productionConfig };
