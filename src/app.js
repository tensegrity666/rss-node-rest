/* eslint-disable no-process-exit */
/* eslint-disable no-undef */

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const winston = require('./config/winston');
const logger = require('./common/utils/logger');
const errorHandler = require('./common/utils/error-handler');
const chalk = require('chalk');
// eslint-disable-next-line no-unused-vars
const errorGenerator = require('./common/utils/error-generator');

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();

app.use(morgan(':status :method :url', { stream: winston.stream }));
app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

process.on('unhandledRejection', (reason = {}) => {
  winston.error(`Unhandled rejection: ${reason.message || 'Promise rejected'}`);
});

process.on('uncaughtException', (err, origin) => {
  winston.error(`Caught exception: ${err} - Exception origin: ${origin}`);

  console.log(
    chalk.bgRed.white.bold(
      '\nApp must be aborted because:\n' +
        'https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly \n'
    )
  );
});

app.use(logger);
app.use(errorHandler);

// ! ERROR SAMPLES
console.log(
  chalk.blueBright.bold(
    '\nTo enable errors, uncomment lines below 58 in app.js\n'
  )
);
// errorGenerator();

// uncaughtExceptionFunction(
//   'This function will raise an error that will be logged, but will cause the application to crash'
// );

// throw Error('One more uncaught exception...');

module.exports = app;
