const { Router } = require('express');
const { authClient } = require('../middleware/auth');
const { Users } = require('../models');

const login = Router();
const userExists = async (email) => Users.findAll({ where: { email } });

const validateLogin = async ({ email, password }) => {
  const error = { isError: false };
  if (email === undefined) {
    error.isError = true;
    error.statusCode = 400;
    error.message = '"email" is required';
    return error;
  }
  if (email === '') {
    error.isError = true;
    error.statusCode = 400;
    error.message = '"email" is not allowed to be empty';
    return error;
  }
  if (password === undefined) {
    error.isError = true;
    error.statusCode = 400;
    error.message = '"password" is required';
    return error;
  }
  if (password === '') {
    error.isError = true;
    error.statusCode = 400;
    error.message = '"password" is not allowed to be empty';
    return error;
  }
  const isUserExists = await userExists(email);
  if (!isUserExists.length) {
    error.isError = true;
    error.statusCode = 400;
    error.message = 'Campos inválidos';
    return error;
  }
  return error;
};
login.post('/', authClient(), async (req, res) => {
  const isLoginValid = await validateLogin(req.body);
  if (isLoginValid.isError) {
    req.headers = { authorization: 'null' };
    return res.status(isLoginValid.statusCode).send(isLoginValid);
  }
  res.status(200).send({ token: req.headers.authorization });
});

module.exports = login;
