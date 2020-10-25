const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.get('/', async (req, res) => {
  const boards = await tasksService.getAll();

  res.json(boards);
});

router.get('/:boardId', async (req, res) => {
  const board = await tasksService.get(req.params.boardId);

  if (!board) {
    return res.sendStatus(404);
  }

  res.json(board);
});

router.delete('/:boardId', async (req, res) => {
  const result = await tasksService.del(req.params.boardId);

  if (result.deletedCount === 0) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});

router.post('/', async (req, res) => {
  const board = await tasksService.create(req.body);

  res.json(board);
});

router.put('/:boardId', async (req, res) => {
  const board = await tasksService.update({
    id: req.params.boardId,
    updatedInfo: req.body
  });

  if (!board) {
    return res.sendStatus(404);
  }

  res.json(board);
});

// router.route('/').get(async (req, res) => {
//   try {
//     const tasks = await tasksService.getAll(req.params.boardId);

//     if (!tasks) {
//       return res.status(404).send('Not found');
//     }

//     res.json(tasks);
//   } catch (error) {
//     throw new Error(`Something goes wrong: ${error.message}`);
//   }
// });

// router.route('/:taskId').get(async (req, res) => {
//   try {
//     const { boardId, taskId } = req.params;

//     const task = await tasksService.get({ boardId, taskId });

//     if (!task) {
//       return res.status(404).send('Not found');
//     }

//     return res.json(task);
//   } catch (error) {
//     throw new Error(`Something goes wrong: ${error.message}`);
//   }
// });

// router.route('/:taskId').delete(async (req, res) => {
//   try {
//     const { boardId, taskId } = req.params;

//     const result = await tasksService.del({ boardId, taskId });

//     if (!result) {
//       return res.status(404).send('Not found');
//     }

//     res.status(204).send('Deleted');
//   } catch (error) {
//     throw new Error(`Something goes wrong: ${error.message}`);
//   }
// });

// router.route('/:taskId').put(async (req, res) => {
//   try {
//     const { boardId, taskId } = req.params;

//     console.log(boardId);
//     console.log(taskId);

//     const updatedInfo = {
//       id: taskId,
//       boardId,
//       ...req.body
//     };

//     const task = await tasksService.update({ taskId, boardId, updatedInfo });

//     if (!task) {
//       return res.status(400).send('Bad request');
//     }

//     res.json(task);
//   } catch (error) {
//     throw new Error(`Something goes wrong: ${error.message}`);
//   }
// });

// router.route('/').post(async (req, res) => {
//   try {
//     const newTask = {
//       ...req.body,
//       boardId: req.params.boardId
//     };

//     const task = await tasksService.create(newTask);

//     res.json(task);
//   } catch (error) {
//     throw new Error(`Something goes wrong: ${error.message}`);
//   }
// });

module.exports = router;
