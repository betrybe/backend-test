const { Router } = require('express');
const rescue = require('express-rescue');
const uService = require('../service');

const router = Router();

router.post('/', rescue(async (req, res, next) => {
  const payLoad = req.body;
  const response = await uService.UserServices(payLoad);
  if (response.error) return next(response);
}));

module.exports = {
  router,
};
