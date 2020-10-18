const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.userId);
    res.json(User.toResponse(user));
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const userInfo = {
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    };

    const user = await usersService.create(userInfo);

    res.json(User.toResponse(user));
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

router.route('/:userId').delete(async (req, res) => {
  try {
    const result = await usersService.del(req.params.userId);

    if (!result) {
      return res.status(404).send('Not found');
    }

    res.status(204).send('Deleted');
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

router.route('/:userId').put(async (req, res) => {
  try {
    const id = req.params.userId;

    const updatedInfo = {
      id,
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    };

    const user = await usersService.update({ id, updatedInfo });

    if (!user) {
      return res.status(400).send('Bad request');
    }

    res.json(User.toResponse(user));
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

module.exports = router;
