const Task = require('../resources/tasks/task.model');

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
const task6 = {
  id: 't4',
  boardId: '12345',
  title: 'Task6',
  description: 'Sixth task',
  order: 4
};

let tasksDB = [task1, task2, task3, task4, task5, task6];

const getAllTasks = boardId => [
  tasksDB.filter(task => task.boardId === boardId)
];

const getTask = (boardId, taskId) => {
  const tasks = tasksDB.filter(task => task.boardId === boardId);
  const task = tasks.filter(element => element.id === taskId);

  return task;
};

const createTask = (boardId, task) => {
  tasksDB.push(task);

  return getTask(boardId, task.id);
};

const deleteTask = (boardId, taskId) => {
  const board = getAllTasks(boardId).flat();

  const task = board.filter(element => element.id === taskId)[0];
  task.boardId = null;

  const index = tasksDB.indexOf(task);
  const boardsBefore = tasksDB.slice(0, index);
  const boardsAfter = tasksDB.slice(index + 1);
  tasksDB = [...boardsBefore, ...boardsAfter];

  return getAllTasks(boardId).flat()[0];
};

const updateTask = (boardId, taskId, value) => {
  const task = getTask(boardId, taskId);

  const updated = Object.assign(...task, value);

  return updated;
};

module.exports = { getAllTasks, getTask, deleteTask, createTask, updateTask };
