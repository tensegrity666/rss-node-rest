const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config/config');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) return res.status(401).send('Unauthorized user!');

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') return res.status(401).send('Unauthorized user!');

  jwt.verify(token, JWT_SECRET_KEY);
  return next();
};
