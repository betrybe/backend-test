const rescue = require('express-rescue');
const { users } = require('../../services');

const createUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const user = await users.createUser(displayName, email, password, image);

  if (user.status) return next(user);

  return res.status(201).json(user);
});

const loginUser = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await users.loginUser(email, password);

  if (user.status) return next(user);

  return res.status(200).json(user);
});

const getAllUsers = rescue(async (_req, res) => {
  const usersList = await users.getAllUsers();

  res.status(200).json(usersList);
});

const getUserById = rescue(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.user);

  const user = await users.getUserById(id);

  if (user.status) return next(user);

  return res.status(200).json(user);
});

const deleteUserById = rescue(async (req, res) => {
  const { email } = req.user;

  await users.deleteUserById(email);

  return res.status(204).json();
});

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUserById,
};
