const { Router } = require('express');
const middlewares = require('../middlewares');

const { users } = require('./routes');

const { schemas, validateSchema } = middlewares.validation;

const login = Router();

login.route(
  '/login',
  validateSchema(schemas.loginSchema),
  users.loginUser,
  middlewares.login,
);

module.exports = login;
