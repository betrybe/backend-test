const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) =>
  User.create({ displayName, email, password, image });

const userLogin = async (request) => {
  const { email, password } = request;
  if (typeof email === 'string' && email.length === 0) {
    return { errors: [{ message: '"email" is not allowed to be empty' }] };
  }
  if (typeof password === 'string' && password.length === 0) {
    return { errors: [{ message: '"password" is not allowed to be empty' }] };
  }
  if (!email) return { errors: [{ message: '"email" is required' }] };
  if (!password) return { errors: [{ message: '"password" is required' }] };
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password.toString()) {
    return { errors: [{ message: 'Campos inválidos' }] };
  }
  return user;
};

const getAll = async () => User.findAll();

const deleteUser = async (id) => User.destroy({ where: { id } });

const getById = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) return { message: 'Usuário não existe' };
  return user;
};

module.exports = { createUser, userLogin, getAll, getById, deleteUser };
