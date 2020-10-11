const tasksRepo = require('./task.memory.repository');

const get = id => tasksRepo.get(id);

// const get = id => usersRepo.get(id);
// const create = user => usersRepo.create(user);
// const del = user => usersRepo.del(user);
// const update = (id, value) => usersRepo.update(id, value);

module.exports = { get };
