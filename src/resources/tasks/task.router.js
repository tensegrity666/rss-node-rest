const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);

    res.json(tasks);
  } catch (error) {
    throw new Error('Something goes wrong! ', error.message);
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);

    res.json(task);
  } catch (error) {
    throw new Error('Something goes wrong! ', error.message);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const tasks = await tasksService.del(req.params.boardId, req.params.taskId);

  res.json(tasks);
});

// ! ПЕРЕДЕЛАТЬ
router.route('/:taskId').put(async (req, res) => {
  const taskFragment = {
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boardId,
    columnId: req.body.columnId
  };

  // eslint-disable-next-line no-undef
  const board = await boardsService.get(req.params.boardId);
  const { tasks } = board;
  const task = await tasks.filter(el => el.id === req.params.taskId);

  res.json(Object.assign(...task, taskFragment));
});

// router.route('/:id').put(async (req, res) => {
//   const user = await usersService.update(req.params.id, {
//     login: req.body.login,
//     password: req.body.password,
//     name: req.body.name
//   });
//   res.json(User.toResponse(user));
// });

module.exports = router;
