const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const userLogin = async (userEmail, userPassword) => {
  const user = await User.findOne({ where: { email: userEmail } });
  if (user.email !== userEmail) return { status: 404, message: 'Não há cadastro com esse email.' };
  if (user.password !== userPassword) return { status: 400, message: 'Senha incorreta.' };
  const { password, ...userData } = user;
  const token = jwt.sign(userData, process.env.SECRET || 'blogsApiSecret', jwtConfig);
  return { ...userData, token };
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

module.exports = {
  createUser,
  userLogin,
};
