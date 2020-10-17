const winston = require('../../config/winston');
const chalk = require('chalk');

const errorGenerator = () => {
  console.log(
    chalk.magenta.bold(
      '\nTo disable this errors, comment out lines below 58 in app.js\n' +
        'Some different non-crashing errors:\n'
    )
  );

  winston.info('Logger Info level example');
  winston.debug('Logger Debug level example');
  winston.error('Logger Error level example');

  try {
    // eslint-disable-next-line no-undef
    someUndefinedFunction();

    throw new Error('Some scary error');
  } catch (error) {
    winston.error(error.message);
  }

  Promise.reject(new Error('Error in Promise'));
};

module.exports = errorGenerator;
