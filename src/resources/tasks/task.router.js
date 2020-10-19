const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);

    if (!tasks) {
      return res.status(404).send('Not found');
    }

    res.json(tasks);
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;

    const task = await tasksService.get({ boardId, taskId });

    if (!task) {
      return res.status(404).send('Not found');
    }

    return res.json(task);
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;

    const result = await tasksService.del({ boardId, taskId });

    if (!result) {
      return res.status(404).send('Not found');
    }

    res.status(204).send('Deleted');
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

router.route('/:taskId').put(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;

    const updatedInfo = {
      id: taskId,
      boardId,
      ...req.body
    };

    const task = await tasksService.update({ taskId, boardId, updatedInfo });

    if (!task) {
      return res.status(404).send('Not found');
    }

    res.json(task);
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
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
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

module.exports = router;
