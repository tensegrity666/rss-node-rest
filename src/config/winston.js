/* eslint-disable no-unused-vars */

const winston = require('winston');
const { NODE_ENV } = require('./config');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({ filename: './logs/combined.log' })
  ]
});

if (NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.simple()
    })
  );
}

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;
