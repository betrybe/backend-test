const { Router } = require('express');
const auth = require('../middlewares/auth');
const { registerUser, getAllUsers } = require('../services/userServices');

const userRoute = Router();

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const createdUser = await registerUser(displayName, email, password, image, next);
  return createdUser.ok
    ? res.status(createdUser.status).json({ token: createdUser.token })
    : next(createdUser);
};

const getUser = async (_req, res) => {
  const users = await getAllUsers();
  return res.status(200).json(users);
};

const getUserById = (_req, res) => res.status(200).json({ ok: true });

const deleteUser = (_req, res) => res.status(200).json({ ok: true });

userRoute.route('/').get(auth(true), getUser).post(createUser);
userRoute.route('/:id').get(auth(true), getUserById);
userRoute.route('/me').delete(auth(true), deleteUser);

module.exports = userRoute;
