const { Router } = require('express');
const rescue = require('express-rescue');
const { UserServices } = require('../service');
const validateJwt = require('../authmiddleware/validateToken')

const router = Router();

router.post('/', rescue(async (req, res, next) => {
  const payLoad = req.body;
  const response = await UserServices.CreateUser(payLoad);
  if (response.error) return next(response.error);
  res.status(201).json({ token: response.token });
}));

router.get('/', validateJwt, rescue(async (req, res, _nex) => {
  const { email, password } = req.body;
  const response = await UserServices.GetUsers(email, password);
  res.status(200).json(response);
}));

router.get('/:id', validateJwt, rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await UserServices.getUserbyId(id);
  if (response.error) return next(response.error);
  res.status(200).json(response);
}))

router.delete('/me', validateJwt, rescue(async (req, res) => {
  const { email } = req.user;
  await UserServices.deleteMyUser(email);
  res.status(204).end();
}))

module.exports = router;
