const router = require('express').Router();
const usersService = require('./user.service');
const { idScheme, userScheme } = require('../../common/utils/validator');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
});

router.get('/:userId', async (req, res) => {
  const { error } = idScheme.validate(req.params.userId);
  if (error) return res.status(400).send(error.message);

  const user = await usersService.get(req.params.userId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
});

router.delete('/:userId', async (req, res) => {
  const { error } = idScheme.validate(req.params.userId);
  if (error) return res.status(400).send(error.message);

  const result = await usersService.del(req.params.userId);

  if (result.deletedCount === 0) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});

router.put('/:userId', async (req, res) => {
  const { error } = idScheme.validate(req.params.userId);
  if (error) return res.status(400).send(error.message);

  const user = await usersService.update({
    id: req.params.userId,
    updatedInfo: req.body
  });

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
});

router.post('/', async (req, res) => {
  const { error } = userScheme.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await usersService.create(req.body);

  res.json(user);
});

module.exports = router;
