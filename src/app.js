const express = require('express');
const path = require('path');
const morgan = require('morgan');

const { logger, errors } = require('./config/winston');
const { logResponse, errResponse, parseBody } = require('./config/morgan');

const errorHandler = require('./common/utils/error-handler');
const rejectionHandler = require('./common/utils/rejection-handler');
const exceptionHandler = require('./common/utils/exception-handler');
// eslint-disable-next-line no-unused-vars
const errorGenerator = require('./common/utils/error-generator');

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

morgan.token('body', parseBody);
app.use(
  morgan(errResponse, {
    skip(req, res) {
      return res.statusCode < 400;
    },
    stream: errors.stream
  })
);
app.use(morgan(logResponse, { stream: logger.stream }));

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

process
  .on('unhandledRejection', rejectionHandler)
  .on('uncaughtException', exceptionHandler);

app.use(errorHandler);

// errorGenerator();
// uncaughtExceptionFunction();
// throw Error('One more uncaught exception...');

module.exports = app;
