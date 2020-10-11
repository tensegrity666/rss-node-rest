const router = require('express').Router({ mergeParams: true });
const boardsService = require('../boards/board.service');

router.route('/').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.boardId);
    const { tasks } = board;
    res.json(tasks);
  } catch (error) {
    throw new Error('Something goes wrong! ', error.message);
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.boardId);
    const { tasks } = board;
    const task = tasks.filter(el => el.id === req.params.taskId);
    res.send(task);
  } catch (error) {
    throw new Error('Something goes wrong! ', error.message);
  }
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

  const board = await boardsService.get(req.params.boardId);
  const { tasks } = board;
  const task = tasks.filter(el => el.id === req.params.taskId);

  res.json(Object.assign(...task, taskFragment));
});

// router.route('/:id').delete(async (req, res) => {
//   const tasks = await usersService.del(req.params.id);
//   res.json(tasks);
// });

// router.route('/:id').put(async (req, res) => {
//   const user = await usersService.update(req.params.id, {
//     login: req.body.login,
//     password: req.body.password,
//     name: req.body.name
//   });
//   res.json(User.toResponse(user));
// });

module.exports = router;
