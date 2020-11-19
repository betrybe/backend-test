const { Router } = require('express');
const { users } = require('./routes');

const { validation, login } = require('../middlewares');

const { schemas, validateSchema } = validation;

const user = Router();

user
  .route('/user')
  .post(validateSchema(schemas.userSchema), users.createUser, login);

module.exports = user;
