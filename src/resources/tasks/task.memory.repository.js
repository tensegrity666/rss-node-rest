const { getAllTasks, getTask, deleteTask } = require('../../common/db-tasks');

const getAll = async id => await getAllTasks(id);
const get = async (boardId, taskId) => await getTask(boardId, taskId);
const del = async (boardId, taskId) => await deleteTask(boardId, taskId);

module.exports = { getAll, get, del };
