const Task = require('../resources/tasks/task.model');

const task1 = new Task({ title: 'Some title' });
const task2 = new Task({ order: 2 });
const task3 = new Task({ description: 'Thirddd task' });
const task4 = {
  id: 't4',
  title: 'Task1',
  description: 'Fourd task',
  order: 4
};

const tasksDB = [task1, task2, task3, task4];
const tasksDB2 = [task1, task2, task3, task4, task1, task1, task3, task3];

// const deleteBoard = id => [...tasksDB.filter(element => element.id !== id)];

// const updateBoard = (id, value) => {
//   const user = getBoard(id);
//   const index = tasksDB.indexOf(user);
//   return (tasksDB[index] = { id, user, ...value });
// };

module.exports = tasksDB;
module.exports = tasksDB2;
