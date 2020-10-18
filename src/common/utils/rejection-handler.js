const { logger, errors } = require('../../config/winston');

const rejectionHandler = (reason = '') => {
  const message = `Unhandled rejection: ${reason.message ||
    'Promise rejected'}`;

  errors.error(message);
  logger.error(message);
};

module.exports = rejectionHandler;
