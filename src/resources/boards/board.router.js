const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  } catch (error) {
    throw new Error('something goes wrong!');
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  const boards = await boardsService.del(req.params.id);
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, {
    title: req.body.title,
    columns: req.body.columns
  });
  res.json(Board.toResponse(board));
});

module.exports = router;
