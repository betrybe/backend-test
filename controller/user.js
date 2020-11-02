const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { createToken } = require('../services');
const { userService } = require('../services');
const { errors } = require('../services');
require('dotenv/config');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  if (!email) {
    return res.status(400).json(errors.errorEmailReq);
  }
  if (!password) {
    return res.status(400).json(errors.errorPasswordReq);
  }
  if (!userService.validateName(displayName)) {
    return res.status(400).json(errors.errorName);
  }
  if (password.length < 6) {
    return res.status(400).json(errors.errorPassword);
  }
  if (!userService.validateEmail(email)) {
    return res.status(400).json(errors.errorEmail);
  }
  if (await userService.checkUserExist(email)) {
    return res.status(409).json(errors.errorUserExist);
  }

  const newUser = await Users.create({ displayName, email, password, image });

  const token = await createToken({ newUser });

  return res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (userService.checkEmailEmpty(email)) {
    return res.status(400).json(errors.emailNull);
  }
  if (userService.checkPasswordEmpty(password)) {
    return res.status(400).json(errors.passwordNull);
  }
  if (!email) {
    return res.status(400).json(errors.errorEmailReq);
  }
  if (!password) {
    return res.status(400).json(errors.errorPasswordReq);
  }
  if (!(await userService.checkUserDb(email, password))) {
    return res.status(400).json(errors.loginInvalid);
  }

  const token = await createToken({ email, password });
  return res.status(200).json({ token });
};

const getAllUsers = async (req, res) => {
  const token = await req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const SECRETE_KEY = process.env.SECRETE_KEY || 'l2UPGGeOuHP5cS1lhofe';

  jwt.verify(token, SECRETE_KEY, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }
  });

  const getAll = await userService.getAllUsers();
  return res.send(getAll);
};

const getUserById = async (req, res) => {
  const token = await req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const SECRETE_KEY = process.env.SECRETE_KEY || 'l2UPGGeOuHP5cS1lhofe';

  jwt.verify(token, SECRETE_KEY, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }
  });
  const user = await userService.getUserById(req.params.id);
  if (user.length <= 0) return res.status(404).json(errors.invalidId);

  return res.status(200).json(user[0]);
};

const deleteMe = async (req, res, _next) => {
  const token = await req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const SECRETE_KEY = process.env.SECRETE_KEY || 'l2UPGGeOuHP5cS1lhofe';

  await jwt.verify(token, SECRETE_KEY, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }
  });

  const teste = jwt.decode(token, SECRETE_KEY);

  const user = await Users.findAll({ where: { email: teste.user.email } });

  const { id } = user[0].dataValues;

  await Users.destroy({ where: { id } });

  return res.status(204).json();
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
  deleteMe,
};
