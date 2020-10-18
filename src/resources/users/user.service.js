const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const User = require('./user.model');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = userInfo => usersRepo.create(new User(userInfo));
const del = async id => {
  await tasksRepo.reset(id);
  return await usersRepo.del(id);
};
const update = ({ id, updatedInfo }) => usersRepo.update({ id, updatedInfo });

module.exports = { getAll, get, create, del, update };
