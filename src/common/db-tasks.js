const Task = require('../resources/tasks/task.model');

const task1 = new Task();
const task2 = new Task();
const task3 = new Task();
const task4 = {
  id: 't4',
  title: 'Task1',
  description: 'Fourd task',
  order: 4
};

const tasksDB = [task1, task2, task3, task4];

const getTask = id => tasksDB.filter(element => element.id === id)[0];

// const createBoard = user => {
//   tasksDB.push(user);
//   return getBoard(user.id);
// };

// const deleteBoard = id => [...tasksDB.filter(element => element.id !== id)];

// const updateBoard = (id, value) => {
//   const user = getBoard(id);
//   const index = tasksDB.indexOf(user);
//   return (tasksDB[index] = { id, user, ...value });
// };

module.exports = { getTask };
module.exports = tasksDB;
