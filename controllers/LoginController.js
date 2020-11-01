const { Router } = require('express');
const rescue = require('express-rescue');
const uLogin = require('../service');

const router = Router();

router.post('/', rescue(async (req, res, next) => {
  const payLoad = req.body;
  const response = await uLogin.UserLogin.UserLogin(payLoad);
  if (response.error) return next(response.error);
  res.status(200).json({ token: response.token });
}));

module.exports = router;
