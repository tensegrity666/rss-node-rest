const tasksRepo = require('./task.repository');

const toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const getAll = async boardId => {
  const tasks = await tasksRepo.getAllTasks(boardId);
  return tasks.map(task => toResponse(task));
};

const get = async ({ taskId, boardId }) => {
  const task = await tasksRepo.getTask({ taskId, boardId });
  return task && toResponse(task);
};

const create = async newTask => {
  const task = await tasksRepo.createTask(newTask);
  return toResponse(task);
};

const del = ({ taskId, boardId }) => tasksRepo.deleteTask({ taskId, boardId });

const update = ({ taskId, boardId, updatedInfo }) =>
  tasksRepo.updateTask({ taskId, boardId, updatedInfo });

module.exports = {
  getAll,
  get,
  del,
  create,
  update
  // resetByBoard
};
