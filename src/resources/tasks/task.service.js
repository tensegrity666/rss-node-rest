const tasksRepo = require('./task.memory.repository');

const Task = require('./task.model');

const getAll = boardId => tasksRepo.getAllTasks(boardId);
const get = ({ boardId, taskId }) => tasksRepo.getTask({ boardId, taskId });
const create = newTask => tasksRepo.createTask(new Task(newTask));
const del = ({ boardId, taskId }) => tasksRepo.deleteTask({ boardId, taskId });
const update = ({ taskId, boardId, updatedInfo }) =>
  tasksRepo.updateTask({ taskId, boardId, updatedInfo });
const reset = id => tasksRepo.resetConnectionsByUserId(id);
const resetByBoard = boardId => tasksRepo.resetConnectionsByBoardId(boardId);

module.exports = { getAll, get, del, create, update, reset, resetByBoard };
