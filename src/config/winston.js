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
  dateFormat,
  colorize
} = format;
const { NODE_ENV } = require('./config');

const myFormat = printf(info => {
  const formattedDate = info.timestamp.replace('T', ' ').replace('Z', '');
  const statuscode = Number(info.message.substring(0, 3));
  const message = info.message.substring(4, info.message.length);

  return `${formattedDate}: [${Number.isNaN(statuscode) ? '-' : statuscode}] ${
    Number.isNaN(statuscode) ? info.message : message
  }`;
});

const logger = createLogger({
  transports: [
    new transports.File({
      filename: './logs/combined.log',
      maxsize: 5242880,
      maxFiles: 10,
      level: global.loglevel || 'info',
      format: combine(timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }), myFormat)
    })
  ]
});

const errors = createLogger({
  transports: [
    new transports.File({
      filename: './logs/error.log',
      maxsize: 5242880,
      maxFiles: 10,
      level: 'error',
      format: combine(timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }), myFormat)
    })
  ]
});

if (NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      level: 'debug',
      format: combine(colorize(), simple())
    })
  );
}

errors.exceptions.handle();
errors.exitOnError = false;

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  }
};

errors.stream = {
  write(message, encoding) {
    errors.error(message);
  }
};

module.exports = { logger, errors };
