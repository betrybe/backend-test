const { User } = require('../models');

const userValidation = (displayName, email, password) => {
  const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  switch (true) {
    case !email:
      return { errors: [{ message: '"email" is required' }] };
    case !password:
      return { errors: [{ message: '"password" is required' }] };
    case displayName.length < 8:
      return {
        errors: [
          {
            message: '"displayName" length must be at least 8 characters long',
          },
        ],
      };
    case !email.match(regexEmail):
      return {
        errors: [{ message: '"email" must be a valid email' }],
      };
    case password.length < 6:
      return {
        errors: [{ message: '"password" length must be 6 characters long' }],
      };
    default:
      return false;
  }
};

const createUser = async ({ displayName, email, password, image }) => {
  const validation = userValidation(displayName, email, password);

  if (validation) return validation;

  return User.create({ displayName, email, password, image });
};

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

const getAllUsers = async () => User.findAll({ attributes: { exclude: 'password' } });

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } }, { attributes: { exclude: 'password' } });
  if (!user) return { message: 'Usuário não existe' };
  return user;
};

const deleteUser = async (id) => User.destroy({ where: { id } });

module.exports = { createUser, userLogin, getAllUsers, getUserById, deleteUser };
