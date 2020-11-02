const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const hashed = await bcrypt.hash(password, 12);

  return hashed;
};

const checkHashedPassword = async (password, hash) => await bcrypt.compare(password, hash);

module.exports = { hashPassword, checkHashedPassword };
