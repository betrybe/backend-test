const Joi = require('joi');

const { User } = require('../models');
const shapes = require('../utils/shapes');

const validateUserRegister = async ({ displayName, email, password }) => Joi
  .object({ displayName: shapes.name, email: shapes.email, password: shapes.password })
  .validateAsync({ displayName, email, password })
  .catch((error, value) => ({ message: error && error.message, value }));

const validateUserLogin = async ({ email, password }) => Joi
  .object({ email: shapes.email, password: shapes.password }).unknown(true)
  .validateAsync({ email, password })
  .catch((error, value) => ({ message: error && error.message, value }));

const createUser = async (displayName, email, password, image) =>
  User.create(displayName, email, password, image)
    .then(({ dataValues: { password: p, ...user } }) => user);

const isEmailAvaible = async (email) => User.findOne({ where: { email } })
  .then((res) => !res || { message: 'Usuário já existe' });

const getUserByEmail = async (email) => User.findOne({ where: { email } })
  .then((res) => {
    if (res) {
      const { password, ...user } = res.dataValues;
      return user;
    }
    return { message: 'Usuário não existe' };
  });

const getUserById = async (id) => User.findByPk(id)
  .then((res) => {
    if (res) return res.dataValues;
    return { message: 'Usuário não existe' };
  });

const getAllUsers = async () => User.findAll()
  .then((res) => res && res.map(({ dataValues: { password, ...user } }) => user));

const deleteUser = async (id) => User.destroy({ where: { id } });

module.exports = {
  createUser,
  validateUserRegister,
  isEmailAvaible,
  validateUserLogin,
  getUserByEmail,
  getAllUsers,
  getUserById,
  deleteUser,
};
