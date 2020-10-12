const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const create = (boardId, task) => tasksRepo.create(boardId, task);
const del = (boardId, taskId) => tasksRepo.del(boardId, taskId);
const update = (boardId, taskId, value) =>
  tasksRepo.update(boardId, taskId, value);

module.exports = { getAll, get, del, create, update };
