const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../../common/db-tasks');

const getAll = async id => await getAllTasks(id);
const get = async (boardId, taskId) => await getTask(boardId, taskId);
const create = async (boardId, task) => await createTask(boardId, task);
const update = async (boardId, taskId, value) =>
  await updateTask(boardId, taskId, value);
const del = async (boardId, taskId) => await deleteTask(boardId, taskId);

module.exports = { getAll, get, del, create, update };
