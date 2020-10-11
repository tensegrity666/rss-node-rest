const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);

module.exports = { getAll, get };
