const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).send(err.message || err);
};

module.exports = errorHandler;
