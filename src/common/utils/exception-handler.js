/* eslint-disable no-process-exit */

const { logger, errors } = require('../../config/winston');

const exceptionHandler = (err, origin) => {
  const message = `Caught exception: ${err.message} - Exception origin: ${origin}`;

  errors.error(message);
  logger.error(message);

  setTimeout(() => {
    process.exit(1);
  }, 100);
};

module.exports = exceptionHandler;
