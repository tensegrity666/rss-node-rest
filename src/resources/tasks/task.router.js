const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);

    res.json(tasks);
  } catch (error) {
    throw new Error('Something wrong\n', error.message);
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const props = {
      boardId: req.params.boardId,
      taskId: req.params.taskId
    };

    const task = await tasksService.get(props);

    return res.json(task);
  } catch (error) {
    throw new Error('Something wrong\n', error.message);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    const props = {
      boardId: req.params.boardId,
      taskId: req.params.id
    };

    const isDeleted = await tasksService.del(props);

    if (isDeleted) {
      return res.status(204).send('The task has been deleted');
    }
    res.status(404).send('Not found');
  } catch (error) {
    throw new Error('Error while deleting\n', error.message);
  }
});

router.route('/:taskId').put(async (req, res) => {
  try {
    const props = {
      boardId: req.params.boardId,
      taskId: req.params.taskId,
      updatedTask: req.body
    };

    console.log(props.updatedTask);

    const task = await tasksService.update(props);

    if (task !== undefined) {
      return res.json(task);
    }
    res.status(404).send('Not found');
  } catch (error) {
    res.status(400).send(`Bad request\n ${error.message}`);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newTask = {
      ...req.body,
      boardId: req.params.boardId
    };

    const task = await tasksService.create(newTask);

    res.json(task);
  } catch (error) {
    res.status(400).send(`Bad request\n ${error.message}`);
  }
});

module.exports = router;
