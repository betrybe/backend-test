const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
require('dotenv/config');

const secret = process.env.SECRET || 'jwtSecret';
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
login.post('/', async (req, res) => {
  const isLoginValid = await validateLogin(req.body);
  if (isLoginValid.isError) {
    return res.status(isLoginValid.statusCode).send(isLoginValid);
  }
  const token = jwt.sign(req.body.email, secret);
  res.setHeader('authorization', token);
  res.status(200).send({ token });
});

module.exports = login;
