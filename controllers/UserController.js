const { Router } = require('express');
const rescue = require('express-rescue')

const router = Router();
const services = require('../services');

router.post('/', rescue(async (req, res, next) => {
  const payload = req.body;
  const user = await services.UserServices.CreateUser(payload);
  console.log('controller', user);
  if (user.error) next(user.error);
}));

module.exports = router;
