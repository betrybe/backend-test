const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { users } = require('../services');

const secret = 'tokendentrodasespecificacoesdesegurancamuitomaeniro';

const generateToken = (userObj) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const { password, ...user } = userObj;
  const token = jwt.sign({ user }, secret, jwtConfig);
  return token;
};

const createUser = rescue(async (req, res, next) => {
  const response = await users.createUser(req.body);

  if (response.errors) return next(response);

  return res.status(201).json(response);
});

const deleteUser = rescue(async (req, res) => {
  await users.deleteUser(req.user.id);
  return res.status(204).json();
});

const login = rescue(async (req, res, next) => {
  const response = await users.userLogin(req.body);
  if (response.errors) return next(response);
  const token = generateToken(response);
  return res.status(200).json({ token });
});

const getAll = rescue(async (_req, res) =>
  res.status(200).json(await users.getAllUsers()));

const getById = rescue(async (req, res, next) => {
  const user = await users.getUserById(req.params.id);
  if (user.message) return next({ errors: [{ message: user.message }], code: 404 });
  return res.status(200).json(user);
});

module.exports = { createUser, login, getAll, getById, deleteUser };
