const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const userService = require('../services/user');
require('dotenv').config();

const secret = process.env.SECRET || 'seusecretdetoken';

const generateToken = (userObj) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const { password, ...user } = userObj;
  const token = jwt.sign({ user }, secret, jwtConfig);
  return token;
};

const createUser = rescue(async (req, res) => res
  .status(201).json(await userService.createUser(req.body)));

const deleteUser = rescue(async (req, res) => {
  await userService.deleteUser(req.user.id);
  return res.status(204).json();
});

const login = rescue(async (req, res, next) => {
  const response = await userService.userLogin(req.body);
  if (response.errors) return next(response);
  const token = generateToken(response);
  return res.status(200).json({ token });
});

const getAll = async (_req, res) => res.status(200).json(await userService.getAll());

const getById = async (req, res, next) => {
  const user = await userService.getById(req.params.id);
  if (user.message) return next({ errors: [{ message: user.message }], code: 404 });
  return res.status(200).json(user);
};

module.exports = { createUser, login, getAll, getById, deleteUser };
