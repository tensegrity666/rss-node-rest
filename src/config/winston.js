/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const {
  splat,
  combine,
  timestamp,
  printf,
  simple,
  json,
  prettyPrint,
  colorize
} = format;
const { NODE_ENV } = require('./config');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: './logs/combined.log',
      level: 'info',
      format: combine(
        timestamp(),
        printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
      )
    }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: combine(
        timestamp(),
        printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
      )
    }),
    new transports.Http({
      level: 'warn',
      format: combine(
        timestamp(),
        printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
      )
    })
  ]
});

if (NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      level: 'debug',
      format: combine(colorize(), prettyPrint(), simple())
    })
  );
}

logger.exitOnError = false;

logger.stream = {
  write(message, encoding) {
    if (message !== undefined) {
      message.substring(0, 3) === '500'
        ? logger.error('Internal Server Error')
        : logger.info(message);
    }
    logger.info('Error');
  }
};

module.exports = logger;
