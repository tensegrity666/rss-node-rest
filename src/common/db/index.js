const User = require('../../resources/users/user.model');
const Board = require('../../resources/boards/board.model');
const Task = require('../../resources/tasks/task.model');

const user1 = new User();
const user2 = new User();
const user3 = new User();
const user4 = new User({ id: '123' });

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

const board1 = new Board({ title: 'First board' });
const board2 = { id: 'b2', title: 'SECOND board' };
const board3 = new Board();
const board4 = {
  id: '12345',
  title: 'VasyaBoard'
};

const DB = {
  users: [user1, user2, user3, user4],
  boards: [board1, board2, board3, board4],
  tasks: [task1, task2, task3, task4, task5, task6]
};

module.exports = DB;
