/* eslint-disable no-process-exit */

const { logger, errors } = require('../../config/winston');

const rejectionHandler = (reason = '') => {
  const message = `Unhandled rejection: ${reason.message ||
    'Promise rejected'}`;

  errors.error(message);
  logger.error(message);

  setTimeout(() => {
    process.exit(1);
  }, 100);
};

module.exports = rejectionHandler;
