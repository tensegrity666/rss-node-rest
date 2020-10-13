const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = user => usersRepo.create(user);

const del = async id => {
  await tasksRepo.reset(id);
  const result = await usersRepo.del(id);

  return result;
};

const update = ({ id, updatedUser }) => usersRepo.update({ id, updatedUser });

module.exports = { getAll, get, create, del, update };
