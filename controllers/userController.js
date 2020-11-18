const Boom = require('boom');
const rescue = require('express-rescue');
const createJwtToken = require('../utils/createJwtToken');
const userService = require('../service/userService');
const { Users } = require('../models');

const registerUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = userService.registerUserSchema.validate({ displayName, email, password });

  if (error) return next(Boom.badRequest(error));

  const user = await Users.findAll({ where: { email } });

  if (user.length > 0) return next(Boom.conflict('Usuário já existe'));

  const newUser = await Users.create({ displayName, email, password, image });

  const token = createJwtToken({ newUser });

  return res.status(201).json({ token });
});

const userLogin = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = userService.loginUserSchema.validate({ email, password });

  if (error) return next(Boom.badRequest(error));

  const user = await Users.findAll({ where: { email } });

  if (user.length <= 0) return next(Boom.badRequest('Campos inválidos'));

  if (user[0].password !== password) return next(Boom.unauthorized('Senha ou email incorretos'));

  const token = createJwtToken(user[0]);

  return res.status(200).json({ token });
});

const getAllUsers = rescue(async (_req, res, _next) => {
  const allUsers = await Users.findAll({});

  return res.status(200).json(allUsers);
});

const getUserById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const user = await Users.findAll({ where: { id } });

  if (user.length <= 0) return next(Boom.notFound('Usuário não existe'));

  return res.status(200).json(user[0]);
});

const deleteUserMe = rescue(async (req, res, _next) => {
  const { id } = req.user;

  await Users.destroy({ where: { id } });

  return res.status(204).json();
});

module.exports = {
  registerUser,
  userLogin,
  getAllUsers,
  getUserById,
  deleteUserMe,
};
