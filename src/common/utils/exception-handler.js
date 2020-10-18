const { logger, errors } = require('../../config/winston');
const chalk = require('chalk');

const exceptionHandler = (err, origin) => {
  const message = `Caught exception: ${err.stack} - Exception origin: ${origin}`;

  errors.error(message);
  logger.error(message);

  console.log(
    chalk.bgRed.white.bold(
      '\nApp must be aborted because:\n' +
        'https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly \n'
    )
  );
};

module.exports = exceptionHandler;
