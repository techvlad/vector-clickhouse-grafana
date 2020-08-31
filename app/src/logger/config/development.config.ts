import { LoggerOptions, stdTimeFunctions } from 'pino';

const developmentConfig: LoggerOptions = {
  timestamp: stdTimeFunctions.isoTime,
  prettyPrint: {
    ignore: 'time',
    messageKey: 'message',
  },
  redact: {
    paths: ['hostname', 'pid'],
    remove: true,
  },
  messageKey: 'message',
  formatters: {
    level: level => ({ level })
  }
};

export { developmentConfig };
