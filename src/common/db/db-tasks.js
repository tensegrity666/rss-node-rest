/* eslint-disable no-unused-expressions */
const Task = require('../../resources/tasks/task.model');

const task1 = new Task({ title: 'Some title', boardId: 'b2' });
const task2 = new Task({ order: 2 });
const task3 = new Task({ userId: '123', description: 'Thirddd task' });
const task4 = new Task({
  boardId: 'b2',
  description: 'QWERTY task',
  userId: '123'
});
const task5 = new Task({
  title: 'Linked task 5',
  userId: '123',
  boardId: '12345'
});
const task6 = new Task({
  id: 't4',
  boardId: '12345',
  title: 'Task6',
  userId: '123',
  description: 'Sixth task',
  order: 4
});

let tasksDB = [task1, task2, task3, task4, task5, task6];

const getAllTasks = async boardId => {
  const tasks = await tasksDB.filter(task => task.boardId === boardId);

  return tasks;
};

const getTask = async props => {
  const { boardId, taskId } = props;

  const tasks = await getAllTasks(boardId);
  const task = tasks.filter(element => element.id === taskId);

  return task[0];
};

const createTask = async newTask => {
  tasksDB.push(newTask);

  const task = await getTask({ taskId: newTask.id, boardId: newTask.boardId });

  return task;
};

const deleteTask = ({ boardId, taskId }) => {
  tasksDB = tasksDB.filter(
    item => item.id === taskId && item.boardId === boardId
  );

  return true;
};

const updateTask = async props => {
  const { taskId, boardId, updatedTask } = props;

  const task = await tasksDB.find(
    item => item.id === taskId && item.boardId === boardId
  );

  Object.assign(task, updatedTask);

  return task;
};

const resetConnectionsByUserId = id => {
  tasksDB = tasksDB.map(task =>
    task.userId === id ? { ...task, userId: null } : task
  );
};

const resetConnectionsByBoardId = id => {
  tasksDB = tasksDB.filter(item => item.boardId !== id);
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
