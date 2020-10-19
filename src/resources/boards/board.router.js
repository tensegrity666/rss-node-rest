const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();

    res.json(boards);
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

router.route('/:boardId').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.boardId);

    if (!board) {
      return res.status(404).send('Not found');
    }

    res.json(board);
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const boardInfo = {
      title: req.body.title,
      columns: req.body.columns,
      tasks: []
    };

    const board = await boardsService.create(boardInfo);

    if (!board) {
      return res.status(400).send('Bad request');
    }

    res.json(board);
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

router.route('/:boardId').delete(async (req, res) => {
  try {
    const result = await boardsService.del(req.params.boardId);

    if (!result) {
      return res.status(404).send('Not found');
    }

    res.status(204).send('Deleted');
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

router.route('/:boardId').put(async (req, res) => {
  try {
    const id = req.params.boardId;

    const updatedInfo = {
      id,
      ...req.body
    };

    const board = await boardsService.update({ id, updatedInfo });

    if (!board) {
      return res.status(400).send('Bad request');
    }

    res.json(board);
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

module.exports = router;
