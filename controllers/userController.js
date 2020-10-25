const rescue = require('express-rescue');
const userService = require('../services/userService');

const createUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const data = await userService.newUser(displayName, email, password, image);

  if (data.status) return res.status(data.status).json({ message: data.message });

  return res.status(201).json(data);
});

const loginUser = rescue(async (req, res) => {
  if (typeof (req.body.email) !== 'string') {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (typeof (req.body.password) !== 'string') {
    return res.status(400).json({ message: '"password" is required' });
  }

  const { email, password } = req.body;

  const token = await userService.login(email, password);

  if (token.status) return res.status(token.status).json({ message: token.message });

  return res.status(200).json(token);
});

const userList = rescue(async (_req, res) => {
  const users = await userService.listUsers();

  return res.status(200).json(users);
});

const getUser = rescue(async (req, res) => {
  const user = await userService.findUser(req.params.id);

  if (user.status) return res.status(user.status).json({ message: user.message });

  return res.status(200).json(user);
});

const deleteMe = rescue(async (req, res) => {
  const { id } = req.user;

  await userService.deleteUser(id);

  return res.status(204).send();
});

module.exports = {
  createUser,
  loginUser,
  userList,
  getUser,
  deleteMe,
};
