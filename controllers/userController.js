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

module.exports = {
  createUser,
  login,
};
