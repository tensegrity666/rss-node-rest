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
const task6 = new Task({
  id: 't4',
  boardId: '12345',
  title: 'Task6',
  userId: '123',
  description: 'Sixth task',
  order: 4
});

const tasksDB = [task1, task2, task3, task4, task5, task6];

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

  const nTask = await getTask({ taskId: newTask.id, boardId: newTask.boardId });

  return nTask;
};

const deleteTask = async props => {
  const { boardId, taskId } = props;

  const taskIndex = await tasksDB.findIndex(
    item => item.id === taskId && item.boardId === boardId
  );

  tasksDB.splice(taskIndex, 1);

  return true;
};

const updateTask = async props => {
  const { taskId, boardId, updatedTask } = props;

  const taskIndex = tasksDB.findIndex(
    item => item.id === taskId && item.boardId === boardId
  );

  try {
    tasksDB.splice(taskIndex, 1, updatedTask);

    return getTask(boardId, taskId);
  } catch (error) {
    throw new Error(
      `Error occured while updating task ${taskId}:\n ${error.message}`
    );
  }
};

const resetConnectionsByUserId = id => {
  tasksDB.forEach(item => {
    if (item.userId === id) {
      item.userId = null;
    }
  });

  return true;
};

const resetConnectionsByBoardId = id => {
  const updatedTasks = tasksDB.filter(item => item.boardId !== id);

  tasksDB.splice(0, tasksDB.length, updatedTasks);

  return true;
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
