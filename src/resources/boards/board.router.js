const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.boardId);

    res.json(board);
  } catch (error) {
    throw new Error('Something goes wrong! ', error);
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

  res.json(board);
});

router.route('/:boardId').delete(async (req, res) => {
  const boards = await boardsService.del(req.params.boardId);

  res.json(boards);
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardsService.update(req.params.boardId, {
    title: req.body.title,
    columns: req.body.columns
  });

  res.json(board);
});

module.exports = router;
