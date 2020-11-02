const router = require('express').Router();
const { signToken } = require('./login.service');
const { loginScheme } = require('../../common/utils/validator');

router.post('/', async (req, res) => {
  const { error } = loginScheme.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const { login, password } = req.body;
  const token = await signToken(login, password);

  if (!token) {
    return res.sendStatus(403);
  }

  res.json(token);
});

module.exports = router;
