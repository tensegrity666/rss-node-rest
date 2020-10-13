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
  const result = await boardsService.del(req.params.boardId);

  if (result) {
    res.status(204).send('The board has been deleted');
  }

  res.status(404).send('Board not found');
});

router.route('/:boardId').put(async (req, res) => {
  const id = req.params.boardId;

  const updatedBoard = new Board({
    id,
    title: req.body.title,
    columns: req.body.columns
  });

  const board = await boardsService.update({ id, updatedBoard });

  res.status(200).json(board);
});

module.exports = router;
