const Task = require('./task.model');

const getAllTasks = boardId => Task.find({ boardId });

const getTask = ({ taskId, boardId }) => Task.findOne({ _id: taskId, boardId });

const createTask = newTask => Task.create(newTask);

const deleteTask = ({ taskId, boardId }) =>
  Task.deleteOne({ _id: taskId, boardId });

const updateTask = async ({ taskId, boardId, updatedInfo }) => {
  await Task.updateOne({ _id: taskId, boardId }, updatedInfo);
  return getTask({ taskId, boardId });
};

const resetConnectionsByUserId = userId =>
  Task.updateMany({ userId }, { userId: null });

const resetConnectionsByBoardId = boardId =>
  Task.updateMany({ boardId }, { boardId: null });

module.exports = {
  getAllTasks,
  getTask,
  deleteTask,
  createTask,
  updateTask,
  resetConnectionsByUserId,
  resetConnectionsByBoardId
};
