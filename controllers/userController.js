const { Router } = require('express');
const auth = require('../middlewares/auth');
const {
  deleteMe,
  getAllUsers,
  getUserById,
  registerUser,
} = require('../services/userServices');

const userRoute = Router();

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const { ok, status, message, token } = await registerUser(displayName, email, password, image, next);
  return ok
    ? res.status(status).json({ token })
    : next({ status, message });
};

const getUsers = async (_req, res) => {
  const users = await getAllUsers();
  return res.status(200).json(users);
};

const getOneUser = async (req, res, next) => {
  const { id } = req.params;
  const { ok, status, message, user } = await getUserById(id);
  return ok
    ? res.status(status).json(user)
    : next({ status, message });
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  await deleteMe(id);
  return res.status(204).json();
};

userRoute.route('/').get(auth(true), getUsers).post(createUser);
userRoute.route('/:id').get(auth(true), getOneUser);
userRoute.route('/me').delete(auth(true), deleteUser);

module.exports = userRoute;
