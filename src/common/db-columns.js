const Column = require('../resources/columns/column.model');
const taskDB = require('./db-tasks');

const col1 = new Column({ title: 'First col', order: 1, tasks: taskDB });
const col2 = new Column({ title: 'Second col', tasks: taskDB });
const col3 = new Column({ order: 3 });
const col4 = {
  id: 'c4',
  title: 'Task4',
  order: 4,
  tasks: taskDB
};

const columnDB = [col1, col2, col3, col4];

module.exports = columnDB;
