const rescue = require('express-rescue');
const { usersService } = require('../services');
const { generateToken } = require('../utils');

const createUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await usersService.createUser(displayName, email, password, image);

  if (newUser.error) {
    return res.status(newUser.error.statusCode).json(newUser.error);
  }

  const token = generateToken({ newUser });

  return res.status(201).json({ token });
});

const login = rescue(async (req, res) => {
  const { email, password } = req.body;

  const userLogin = await usersService.login(email, password);

  console.log('retorno userLogin', userLogin);

  if (userLogin.error) return res.status(userLogin.error.statusCode).json(userLogin.error);

  const token = generateToken({ userLogin, email });

  return res.status(200).json({ token });
});

const getAllUsers = rescue(async (req, res) => {
  const users = await usersService.getAll();
  return res.status(200).json(users);
});

const getUserById = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (user.error) return res.status(user.error.statusCode).json(user.error);

  return res.status(200).json(user);
});

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
};
