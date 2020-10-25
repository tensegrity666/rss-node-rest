const { logger } = require('../../config/winston');
const chalk = require('chalk');

const errorGenerator = () => {
  console.log(
    chalk.magenta.bold(
      '\nTo disable this errors, comment out lines below 59 in app.js\n' +
        'Some different non-crashing errors:\n'
    )
  );

  logger.info('Logger Info level example');
  logger.debug('Logger Debug level example');
  logger.error('Logger Error level example');

  try {
    // eslint-disable-next-line no-undef
    someUndefinedFunction();

    throw new Error('Some scary error');
  } catch (error) {
    logger.error(error.message);
  }

  Promise.reject(new Error('Async error in Promise'));
};

module.exports = errorGenerator;
