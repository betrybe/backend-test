const Joi = require('joi');

const { User } = require('../models');
const shapes = require('../utils/shapes');

const validateUser = async ({ displayName, email, password }) => Joi
  .object({
    displayName: shapes.name,
    email: shapes.email,
    password: shapes.password,
  })
  .validateAsync({ displayName, email, password })
  .catch((error, value) => ({ message: error && error.message, value }))
// .catch(console.log);

const createUser = async (displayName, email, password, image) =>
  User.create(displayName, email, password, image)
    .then(({ dataValues: { password: p, ...user } }) => user);

const isEmailAvaible = async (email) => User.findOne({ where: { email } })
  .then((res) => !res || { message: 'Usuário já existente' });

module.exports = {
  createUser,
  validateUser,
  isEmailAvaible,
};
