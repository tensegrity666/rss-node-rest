const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.userId);
    res.status(200).json(User.toResponse(user));
  } catch (error) {
    throw new Error('something goes wrong!');
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    new User({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    })
  );
  res.status(200).json(User.toResponse(user));
});

router.route('/:userId').delete(async (req, res) => {
  const result = await usersService.del(req.params.userId);

  if (result) {
    res.status(204).json('The user has been deleted');
  }

  res.status(404).send('User not found');
});

router.route('/:userId').put(async (req, res) => {
  const id = req.params.userId;

  const updatedUser = new User({
    id,
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  });

  const user = await usersService.update({ id, updatedUser });
  res.status(200).json(User.toResponse(user));
});

module.exports = router;
