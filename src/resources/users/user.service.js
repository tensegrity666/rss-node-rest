const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const User = require('./user.model');

const getAll = () => usersRepo.getAllUsers();
const get = id => usersRepo.getUser(id);
const create = userInfo => usersRepo.createUser(new User(userInfo));

const del = id => {
  tasksRepo.resetConnectionsByUserId(id);
  return usersRepo.deleteUser(id);
};

const update = ({ id, updatedInfo }) =>
  usersRepo.updateUser({ id, updatedInfo });

module.exports = { getAll, get, create, del, update };
