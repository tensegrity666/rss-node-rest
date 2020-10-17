const winston = require('../../config/winston');

const logger = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(`Error message: ${err}`);
  console.log(`Request: ${req}`);
  console.log(`Response: ${res}`);

  winston.error(
    'Status: 500' +
      `Message: ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  next(err);
};

module.exports = logger;
