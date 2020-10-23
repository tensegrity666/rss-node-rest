const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();

    if (!users) {
      return res.status(404).send('Not found');
    }

    res.json(users);
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

router.route('/:userId').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.userId);

    if (!user) {
      return res.status(404).send('Not found');
    }

    res.json(user);
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
      ...req.body
    };

    const user = await usersService.update({ id, updatedInfo });

    if (!user) {
      return res.status(400).send('Bad request');
    }

    res.json(user);
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const userInfo = {
      ...req.body
    };

    const user = await usersService.create(userInfo);

    if (!user) {
      return res.status(400).send('Bad request');
    }

    res.json(user);
  } catch (error) {
    throw new Error(`Something goes wrong: ${error.message}`);
  }
});

module.exports = router;
