const { Router } = require('express');
const rescue = require('express-rescue');

const router = Router();
const { userServices } = require('../services');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.post('/', rescue(async (req, res, next) => {
  const payload = req.body;
  const response = await userServices.CreateUser(payload);
  if (response.error) return next(response.error);
  res.status(201).json({ token: response.token });
}));

router.get('/', authMiddleware, rescue(async (req, res) => {
  const { dataValues } = req.user;
  if (dataValues) {
    const users = await userServices.GetUsers();
    res.status(200).json(users);
  }
}));

router.get('/:id', authMiddleware, rescue(async (req, res, next) => {
  const pk = req.params.id;
  const response = await userServices.GetUserById(pk);
  if (response.error) return next(response.error);
  res.status(200).json(response);
}));

router.delete('/me', authMiddleware, rescue(async (req, res) => {
  const toDelete = req.user;
  await userServices.DeleteUser(toDelete.email);
  res.status(204).json();
}));

module.exports = router;
