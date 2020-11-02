const usersRepo = require('./user.repository');
const tasksRepo = require('../tasks/task.repository');

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
  const newUser = await usersRepo.createUser(userInfo);
  return toResponse(newUser);
};

const del = async (id) => {
  await tasksRepo.resetConnectionsByUserId(id);
  return usersRepo.deleteUser(id);
};

const update = ({ id, updatedInfo }) =>
  usersRepo.updateUser({ id, updatedInfo });

module.exports = { getAll, get, create, del, update };
