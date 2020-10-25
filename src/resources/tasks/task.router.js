const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const { idScheme } = require('../../common/utils/validator');

router.get('/', async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);

  res.json(tasks);
});

router.get('/:taskId', async (req, res) => {
  const { error } = idScheme.validate(req.params.taskId);
  if (error) return res.status(400).send(error.message);

  const { taskId, boardId } = req.params;

  const task = await tasksService.get({ taskId, boardId });

  if (!task) {
    return res.sendStatus(404);
  }

  res.json(task);
});

router.delete('/:taskId', async (req, res) => {
  const { error } = idScheme.validate(req.params.taskId);
  if (error) return res.status(400).send(error.message);

  const { taskId, boardId } = req.params;

  const result = await tasksService.del({ taskId, boardId });

  if (result.deletedCount === 0) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});

router.post('/', async (req, res) => {
  const newTask = {
    ...req.body,
    boardId: req.params.boardId
  };

  const task = await tasksService.create(newTask);

  res.json(task);
});

router.put('/:taskId', async (req, res) => {
  const { error } = idScheme.validate(req.params.taskId);
  if (error) return res.status(400).send(error.message);

  const { taskId, boardId } = req.params;

  const task = await tasksService.update({
    taskId,
    boardId,
    updatedInfo: req.body
  });

  if (!task) {
    return res.sendStatus(404);
  }

  res.json(task);
});

module.exports = router;
