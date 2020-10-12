const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.status(200).json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.boardId);

    res.status(200).json(board);
  } catch (error) {
    throw new Error('Something goes wrong! ', error.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns,
      tasks: []
    })
  );

  res.status(200).json(board);
});

router.route('/:boardId').delete(async (req, res) => {
  const boards = await boardsService.del(req.params.boardId);

  res.status(200).json(boards);
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardsService.update(req.params.boardId, {
    title: req.body.title,
    columns: req.body.columns
  });

  res.status(200).json(board);
});

module.exports = router;
