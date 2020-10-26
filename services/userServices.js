const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const userLogin = async (userEmail, userPassword) => {
  const user = await User.findOne({ where: { email: userEmail } });
  if (!user || parseInt(user.password, 10) !== parseInt(userPassword, 10)) {
    return { status: 400, response: { message: 'Campos inválidos' } };
  }
  if (user.email !== userEmail) {
    return { status: 404, response: { message: 'Não há cadastro com esse email.' } };
  }
  const { password, ...userData } = user;
  const token = jwt.sign(userData, process.env.SECRET || 'blogsApiSecret', jwtConfig);
  console.log('token', token);
  return { status: 200, response: { token } };
};

const createUser = async (displayName, email = null, password, image) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return { status: 409, response: { message: 'Usuário já existe' } };
  }
  return User.create({ displayName, email, password, image })
    .then((created) =>
      ({ status: 201, response: created }))
    .catch(({ errors }) => ({ status: 400, response: { message: errors[0].message } }));
};

const getAllUsers = async () => User.findAll();

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return { status: 404, response: { message: 'Usuário não existe' } };
  return { status: 200, response: user };
};

const deteleUserById = async (id) => {
  const user = await User.findByPk(id);
  console.log(user);
  if (!user) return { status: 404 };
  await User.destroy({ where: { id } });
  return { status: 204 };
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
  getUserById,
  deteleUserById,
};
