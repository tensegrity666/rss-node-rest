/* eslint-disable no-process-exit */

const { PORT, MONGO_CONNECTION_STRING } = require('./config/config');
const mongoose = require('mongoose');
const app = require('./app');
const { logger, errors } = require('./config/winston');

const startApp = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });

    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  } catch (error) {
    errors.error(error.message);
    logger.error(error.message);
    process.exit(1);
  }
};

startApp();
