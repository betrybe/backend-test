const { Router } = require('express');
const rescue = require('express-rescue');
const uService = require('../service');

const router = Router();

router.post('/', rescue(async (req, res, next) => {
  const payLoad = req.body;
  const response = await uService.UserServices.CreateUser(payLoad);
  if (response.error) return next(response.error);
  res.status(201).json({ token: response.token });
}));

module.exports = router;
