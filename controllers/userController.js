const boom = require('@hapi/boom');

const { userServices } = require('../services');

const userCreation = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const user = await userServices.userCreation({ displayName, email, password, image });

  if (!user) {
    return next(boom.conflict('Usuário já existe'));
  }

  res.status(201).json(user);
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const logedUser = await userServices.userLogin({ email, password });

  if (!logedUser) {
    return next(boom.badRequest('Campos inválidos'));
  }

  res.status(200).json({ token: logedUser });
};

const getAll = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    next(boom.unauthorized('Token expirado ou inválido'));
  }

  const allUser = await userServices.getAlluser();

  res.status(200).json(allUser);
};

module.exports = {
  userCreation,
  userLogin,
  getAll,
};
