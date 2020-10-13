const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  resetConnectionsByUserId,
  resetConnectionsByBoardId
} = require('../../common/db-tasks');

const getAll = async id => await getAllTasks(id);
const get = async ({ boardId, taskId }) => await getTask({ boardId, taskId });
const create = async newTask => await createTask(newTask);
const update = async props => await updateTask(props);
const del = async props => await deleteTask(props);
const reset = async id => await resetConnectionsByUserId(id);
const resetByBoard = async id => await resetConnectionsByBoardId(id);

module.exports = { getAll, get, del, create, update, reset, resetByBoard };
