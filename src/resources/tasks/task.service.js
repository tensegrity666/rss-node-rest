const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = id => tasksRepo.getAll(id);
const get = ({ boardId, taskId }) => tasksRepo.get({ boardId, taskId });
const create = newTask => tasksRepo.create(new Task(newTask));
const del = props => tasksRepo.del(props);
const update = props => tasksRepo.update(props);
const reset = id => tasksRepo.reset(id);
const resetByBoard = id => tasksRepo.resetByBoard(id);

module.exports = { getAll, get, del, create, update, reset, resetByBoard };
