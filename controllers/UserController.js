const { Router } = require('express');
const { Users } = require('../models');
const { authClient } = require('../middleware/auth');
const EmailValidation = require('../helpers/emailValidation');

const user = Router();

const verificarData = async ({ displayName, email, password }) => {
  const error = { isError: false };
  const isValidEmail = EmailValidation(email);
  if (displayName && displayName.length <= 8) {
    error.isError = true;
    error.message = '"displayName" length must be at least 8 characters long';
    return error;
  }
  if (!email) {
    error.isError = true;
    error.message = '"email" is required';
    return error;
  }
  if (email) {
    const isUserExists = await Users.findOne({ where: { email: 'lewishamilton@gmail.com' } });
    console.log(isUserExists);
    if (!isUserExists === null) {
      error.isError = true;
      error.message = '"email" is required';
      return error;
    }
  }
  if (!isValidEmail) {
    error.isError = true;
    error.message = '"email" must be a valid email';
    return error;
  }
  if (!password) {
    error.isError = true;
    error.message = '"password" is required';
    return error;
  }

  if (password && password.length < 6) {
    error.isError = true;
    error.message = '"password" length must be 6 characters long';
    return error;
  }
  return error;
};

const verificaToken = (cookies) => {
  const error = { isError: false };
  if (!cookies) {
    error.isError = true;
    error.message = 'Token não encontrado';
    return error;
  }
  return error;
};
user.post('/', authClient(), async (req, res) => {
  const verifyData = await verificarData(req.body);
  const verifyToken = verificaToken(req.cookies);
  if (verifyData.isError) {
    return res.status(400).send(verifyData);
  }
  if (verifyToken.isError) {
    return res.status(400).send(verifyData);
  }
  return res.status(201).send({ token: req.cookies.token });
});

user.get('/', authClient(), (req, res) => {
  Users.findAll().then((users) => console.log(users));
  res.status(401).send(req.cookies.token);
});
module.exports = user;
