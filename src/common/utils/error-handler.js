const errorHandler = (err, req, res) => {
  res.status(err.status || 500);
  res.render('error', { error: err });
};

module.exports = errorHandler;
