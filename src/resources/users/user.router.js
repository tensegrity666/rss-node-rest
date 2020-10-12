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
  const users = await usersService.del(req.params.userId);
  res.status(200).json(users.map(User.toResponse));
});

router.route('/:userId').put(async (req, res) => {
  const user = await usersService.update(req.params.userId, {
    login: req.body.login,
    password: req.body.password,
    name: req.body.name
  });
  res.status(200).json(User.toResponse(user));
});

module.exports = router;
