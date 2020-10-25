const tasksRepo = require('./task.repository');

const toResponse = board => {
  const { id } = board;
  return { id, ...board };
};

const getAll = async boardId => {
  const tasks = await tasksRepo.getAllTasks(boardId);
  return tasks.map(task => toResponse(task));
};

const get = ({ boardId, taskId }) => tasksRepo.getTask({ boardId, taskId });

const create = newTask => tasksRepo.createTask(newTask);

const del = ({ boardId, taskId }) => tasksRepo.deleteTask({ boardId, taskId });

const update = ({ taskId, boardId, updatedInfo }) =>
  tasksRepo.updateTask({ taskId, boardId, updatedInfo });

const reset = id => tasksRepo.resetConnectionsByUserId(id);

const resetByBoard = boardId => tasksRepo.resetConnectionsByBoardId(boardId);

module.exports = { getAll, get, del, create, update, reset, resetByBoard };
