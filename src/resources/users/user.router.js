const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
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
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const users = await usersService.del(req.params.id);
  res.json(users.map(User.toResponse));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, {
    login: req.body.login,
    password: req.body.password,
    name: req.body.name
  });
  res.json(User.toResponse(user));
});

module.exports = router;
