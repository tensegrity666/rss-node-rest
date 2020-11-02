const usersRepo = require('../users/user.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config/config');
const { checkHashedPassword } = require('../../common/utils/hashHelper');

const signToken = async (login, password) => {
  const user = await usersRepo.getUserByProps({ login });
  if (!user) return false;

  const { id: userId, login: userLogin, password:hashedPassword } = user;

  const validatePassword = await checkHashedPassword(password, hashedPassword);
  if (!validatePassword) return false;

  const token = jwt.sign({ _id: userId, login: userLogin }, JWT_SECRET_KEY, { expiresIn: '1h' });

  return { token };
};

module.exports = { signToken };
