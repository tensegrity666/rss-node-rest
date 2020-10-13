const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const id = req.params.boardId;

  try {
    const tasks = await tasksService.getAll(id);

    res.json(tasks);
  } catch (error) {
    throw new Error('Something goes wrong! ', error.message);
  }
});

router.route('/:taskId').get(async (req, res) => {
  const props = {
    boardId: req.params.boardId,
    taskId: req.params.taskId
  };

  try {
    const task = await tasksService.get(props);

    res.json(task);
  } catch (error) {
    throw new Error('Something goes wrong! ', error.message);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = req.params.id;

  const props = {
    boardId,
    taskId
  };

  const result = await tasksService.del(props);

  if (result) {
    res.status(204).send('The board has been deleted');
  } else {
    res.status(404).send('Not found');
  }
});

router.route('/:taskId').put(async (req, res) => {
  const updatedTask = new Task({
    id: req.params.taskId,
    boardId: req.body.boardId,
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    columnId: req.body.columnId
  });

  const props = {
    boardId: req.params.boardId,
    taskId: req.params.taskId,
    updatedTask
  };

  try {
    const task = await tasksService.update(props);
    res.json(task);
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

router.route('/').post(async (req, res) => {
  const newTask = new Task({
    boardId: req.params.boardId,
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    columnId: req.body.columnId
  });

  const task = await tasksService.create(newTask);

  res.json(task);
});

module.exports = router;
