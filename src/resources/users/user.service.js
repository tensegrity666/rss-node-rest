const usersRepo = require('./user.repository');
const tasksRepo = require('../tasks/task.repository');
const { hashPassword } = require('../../common/utils/hashHelper');

const toResponse = (user) => {
  const { id, name, login } = user;
  return { id, name, login };
};

const getAll = async () => {
  const users = await usersRepo.getAllUsers();
  return users.map((user) => toResponse(user));
};

const get = async (id) => {
  const user = await usersRepo.getUser(id);
  return user && toResponse(user);
};

const create = async (userInfo) => {
  const { password } = userInfo;
  const hashedPassword = await hashPassword(password);

  const processedInfo = {
    ...userInfo,
    password: hashedPassword
  };

  const newUser = await usersRepo.createUser(processedInfo);
  return toResponse(newUser);
};

const del = async (id) => {
  await tasksRepo.resetConnectionsByUserId(id);
  return usersRepo.deleteUser(id);
};

const update = async ({ id, updatedInfo }) => {
  const { password } = updatedInfo;
  const hashedPassword = await hashPassword(password);

  const processedInfo = {
    ...updatedInfo,
    password: hashedPassword
  };

  const updatedUser = await usersRepo.updateUser({ id, processedInfo });
  return toResponse(updatedUser);
};

module.exports = { getAll, get, create, del, update };
