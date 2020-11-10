const rescue = require('express-rescue');
const { userServices } = require('../services');

const createUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await userServices.createUser(displayName, email, password, image);

  if (user.status) return res.status(user.status).json({ message: user.message });

  res.status(201).json(user);
});

const loginUser = rescue(async (req, res) => {
  const { email, password } = req.body;

  const user = await userServices.loginUser(email, password);

  if (user.status) return res.status(user.status).json({ message: user.message });

  res.status(200).json(user);
});

const callUsers = rescue(async (_req, res) => {
  const users = await userServices.callUsers();

  res.status(200).json(users);
});

const callUserId = rescue(async (req, res) => {
  const { id } = req.params;
  console.log(req.user);

  const user = await userServices.callUserId(id);

  if (user.status) return res.status(user.status).json({ message: user.message });

  res.status(200).json(user);
});

const deleteUser = rescue(async (req, res) => {
  const { email } = req.user;

  await userServices.deleteUser(email);

  res.status(204).json();
});

module.exports = {
  createUser,
  loginUser,
  callUsers,
  callUserId,
  deleteUser,
};
