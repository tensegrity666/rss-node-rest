const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const YAML = require('yamljs');

const { logger, errors } = require('./config/winston');
const { logResponse, errResponse } = require('./config/morgan');

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const errorHandler = require('./common/utils/error-handler');
const rejectionHandler = require('./common/utils/rejection-handler');
const exceptionHandler = require('./common/utils/exception-handler');

const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const checkToken = require('./resources/login/check-token');

require('express-async-errors');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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

app.use('/login', loginRouter);
app.use('/users', checkToken, userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

process
  .on('unhandledRejection', rejectionHandler)
  .on('uncaughtException', exceptionHandler);

app.use(errorHandler);

module.exports = app;
