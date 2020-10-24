const { Router } = require('express');
const rescue = require('express-rescue');

const router = Router();
const services = require('../services');

router.post('/', rescue(async (req, res, next) => {
  const payload = req.body;
  const response = await services.UserServices.UserLogin(payload);
  if (response.error) return next(response.error);
  res.status(200).json({ token: response.token });
}));

module.exports = router;
