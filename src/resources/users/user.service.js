const usersRepo = require('./user.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const getAll = async () => {
  const users = await usersRepo.getAllUsers();
  return users.map(user => toResponse(user));
};
const get = async id => {
  const user = await usersRepo.getUser(id);
  return toResponse(user);
};

const create = userInfo => usersRepo.createUser(userInfo);

const del = id => {
  tasksRepo.resetConnectionsByUserId(id);
  return usersRepo.deleteUser(id);
};

const update = ({ id, updatedInfo }) =>
  usersRepo.updateUser({ id, updatedInfo });

module.exports = { getAll, get, create, del, update };
