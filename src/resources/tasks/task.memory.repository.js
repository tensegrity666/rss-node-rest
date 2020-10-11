const { getAllTasks, getTask } = require('../../common/db-tasks');

const getAll = async id => await getAllTasks(id);
const get = async (boardId, taskId) => await getTask(boardId, taskId);

module.exports = { getAll, get };
