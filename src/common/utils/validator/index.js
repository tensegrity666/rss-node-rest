const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    if (error) {
      res.status(property === 'body' ? '422' : '400').send(error.message);
    } else {
      // eslint-disable-next-line callback-return
      next();
    }
  };
};

module.exports = validator;
