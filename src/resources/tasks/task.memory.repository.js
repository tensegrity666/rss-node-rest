const DB = require('../../common/db');

const getAllTasks = boardId =>
  DB.tasks.filter(task => task.boardId === boardId);

const getTask = ({ boardId, taskId }) => {
  const tasks = getAllTasks(boardId);

  return tasks.filter(task => task.id === taskId)[0];
};

const createTask = newTask => {
  DB.tasks.push(newTask);

  return getTask({ boardId: newTask.boardId, taskId: newTask.id });
};

const deleteTask = ({ boardId, taskId }) => {
  // DB.tasks = DB.tasks.filter(task => task.id !== taskId);
  const tasks = getAllTasks(boardId);

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) return false;

  DB.tasks = tasks.filter(task => task.id !== taskId);

  return true;
};

const updateTask = ({ taskId, boardId, updatedInfo }) => {
  const taskIndex = DB.tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) return false;

  DB.tasks.splice(taskIndex, 1, updatedInfo);

  return getTask({ boardId, taskId });
};

const resetConnectionsByUserId = id => {
  DB.tasks = DB.tasks.map(task =>
    task.userId === id ? { ...task, userId: null } : task
  );
};

const resetConnectionsByBoardId = boardId => {
  DB.tasks = DB.tasks.filter(task => task.boardId !== boardId);
};

module.exports = {
  getAllTasks,
  getTask,
  deleteTask,
  createTask,
  updateTask,
  resetConnectionsByUserId,
  resetConnectionsByBoardId
};
