const router = require('express').Router({ mergeParams: true });
const boardsService = require('../boards/board.service');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.boardId);
    const tasks = board.columns.map(column => column.tasks);
    res.json(tasks);
  } catch (error) {
    throw new Error('Something goes wrong! ', error);
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.taskId);
    res.json(task);
  } catch (error) {
    throw new Error('Something goes wrong! ', error);
  }
});

// router.route('/').post(async (req, res) => {
//   const user = await usersService.create(
//     new User({
//       login: req.body.login,
//       password: req.body.password,
//       name: req.body.name
//     })
//   );
//   res.json(User.toResponse(user));
// });

// router.route('/:id').delete(async (req, res) => {
//   const users = await usersService.del(req.params.id);
//   res.json(users.map(User.toResponse));
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
