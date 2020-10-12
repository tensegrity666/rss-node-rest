const router = require('express').Router({ mergeParams: true });
// const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);

    res.status(200).json(tasks);
  } catch (error) {
    throw new Error('Something goes wrong! ', error.message);
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);

    res.status(200).json(task);
  } catch (error) {
    throw new Error('Something goes wrong! ', error.message);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const tasks = await tasksService.del(req.params.boardId, req.params.taskId);

  res.status(200).json(tasks);
});

router.route('/:taskId').put(async (req, res) => {
  const taskFragment = {
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boardId,
    columnId: req.body.columnId
  };

  const board = await tasksService.update(
    req.params.boardId,
    req.params.taskId,
    taskFragment
  );

  res.status(200).json(board);
});

// router.route('/').post(async (req, res) => {
//   const task = await tasksService.create(
//     req.params.boardId,
//     new Task({
//       boardId: req.params.boardId,
//       title: req.body.title,
//       order: req.body.order,
//       description: req.body.description,
//       userId: req.body.userId,
//       columnId: req.body.columnId
//     })
//   );

//   res.status(200).json(task);
// });

module.exports = router;
