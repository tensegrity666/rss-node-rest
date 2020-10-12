const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const del = (boardId, taskId) => tasksRepo.del(boardId, taskId);

module.exports = { getAll, get, del };
