const { Router } = require('express');
const { Users } = require('../models');
const EmailValidation = require('../helpers/emailValidation');
const auth = require('../middleware/auth');

require('dotenv/config');

const user = Router();

const verificarData = async ({ displayName, email, password }) => {
  const error = { isError: false };
  const isValidEmail = EmailValidation(email);
  if (displayName && displayName.length <= 8) {
    error.isError = true;
    error.statusCode = 400;
    error.message = '"displayName" length must be at least 8 characters long';
    return error;
  }
  if (!email) {
    error.isError = true;
    error.statusCode = 400;
    error.message = '"email" is required';
    return error;
  }
  if (email) {
    const isUserExists = await Users.findAll({ where: { email } });
    if (isUserExists.length) {
      error.isError = true;
      error.statusCode = 409;
      error.message = 'Usuário já existe';
      return error;
    }
  }
  if (!isValidEmail) {
    error.isError = true;
    error.statusCode = 400;
    error.message = '"email" must be a valid email';
    return error;
  }
  if (!password) {
    error.isError = true;
    error.statusCode = 400;
    error.message = '"password" is required';
    return error;
  }

  if (password && password.length < 6) {
    error.isError = true;
    error.statusCode = 400;
    error.message = '"password" length must be 6 characters long';
    return error;
  }
  return error;
};

user.post('/', async (req, res) => {
  const verifyData = await verificarData(req.body);
  const { displayName, email, password, image } = req.body;

  if (verifyData.isError) {
    return res.status(verifyData.statusCode).send(verifyData);
  }
  Users.create({
    displayName, email, password, image,
  });
  return res.status(201).send({ token: req.cookies.token });
});

user.get('/', auth, async (req, res) => {
  const userData = await Users.findAll();
  return res.status(200).send(userData);
});

user.get('/:id', auth, async (req, res) => {
  Users.findAll().then((users) => users);
  res.status(401).send(req.cookies.token);
});
module.exports = user;
