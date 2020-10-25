const router = require('express').Router();
const boardsService = require('./board.service');
const { idScheme, boardScheme } = require('../../common/utils/validator');

router.get('/', async (req, res) => {
  const boards = await boardsService.getAll();

  res.json(boards);
});

router.get('/:boardId', async (req, res) => {
  const { error } = idScheme.validate(req.params.boardId);
  if (error) return res.status(400).send(error.message);

  const board = await boardsService.get(req.params.boardId);

  if (!board) {
    return res.sendStatus(404);
  }

  res.json(board);
});

router.delete('/:boardId', async (req, res) => {
  const { error } = idScheme.validate(req.params.boardId);
  if (error) return res.status(400).send(error.message);

  const result = await boardsService.del(req.params.boardId);

  if (result.deletedCount === 0) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});

router.post('/', async (req, res) => {
  const { error } = boardScheme.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const board = await boardsService.create(req.body);

  res.json(board);
});

router.put('/:boardId', async (req, res) => {
  const { error } = idScheme.validate(req.params.boardId);
  if (error) return res.status(400).send(error.message);

  const board = await boardsService.update({
    id: req.params.boardId,
    updatedInfo: req.body
  });

  if (!board) {
    return res.sendStatus(404);
  }

  res.json(board);
});

module.exports = router;
