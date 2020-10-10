const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = user => usersRepo.create(user);
const del = user => usersRepo.del(user);
const update = (id, value) => usersRepo.update(id, value);

module.exports = { getAll, get, create, del, update };
