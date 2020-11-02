const usersRepo = require('../users/user.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config/config');

const signToken = async (login, password) => {
  const user = await usersRepo.getUserByProps({ login, password });
  if (!user) return false;

  const { id: userId, login: userLogin } = user;

  const token = jwt.sign({ _id: userId, login: userLogin }, JWT_SECRET_KEY, { expiresIn: '1h' });

  return token;
};

module.exports = { signToken };
