const Joi = require('joi');

const validateUserRegister = (_, { shapes }) => async ({ displayName, email, password }) => Joi
  .object({ displayName: shapes.name, email: shapes.email, password: shapes.password })
  .validateAsync({ displayName, email, password })
  .catch((error, value) => ({ message: error && error.message, value }));

const validateUserLogin = (_, { shapes }) => async ({ email, password }) => Joi
  .object({ email: shapes.email, password: shapes.password }).unknown(true)
  .validateAsync({ email, password })
  .catch((error, value) => ({ message: error && error.message, value }));

const createUser = ({ User }) => async (displayName, email, password, image) =>
  User.create(displayName, email, password, image)
    .then(({ dataValues: { password: p, ...user } }) => user);

const isEmailAvaible = ({ User }) => async (email) => User.findOne({ where: { email } })
  .then((res) => !res || { message: 'Usuário já existe' });

const getUserByEmail = ({ User }) => async (email) => User.findOne({ where: { email } })
  .then((res) => {
    if (res) {
      const { password, ...user } = res.dataValues;
      return user;
    }
    return { message: 'Usuário não existe' };
  });

const getUserById = ({ User }) => async (id) => User.findByPk(id)
  .then((res) => {
    if (res) return res.dataValues;
    return { message: 'Usuário não existe' };
  });

const getAllUsers = ({ User }) => async () => User.findAll()
  .then((res) => res && res.map(({ dataValues: { password, ...user } }) => user));

const deleteUser = ({ User }) => async (id) => User.destroy({ where: { id } });

module.exports = (models, utils) => ({
  validateUserLogin: validateUserLogin(models, utils),
  validateUserRegister: validateUserRegister(models, utils),
  createUser: createUser(models, utils),
  isEmailAvaible: isEmailAvaible(models, utils),
  getUserByEmail: getUserByEmail(models, utils),
  getAllUsers: getAllUsers(models, utils),
  getUserById: getUserById(models, utils),
  deleteUser: deleteUser(models, utils),
});
