const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'xablaublaxablau';
const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const validateRegister = (displayName, email, password) => {
  if (!email) return { status: 400, message: '"email" is required' };
  if (!password) return { status: 400, message: '"password" is required' };
  if (displayName.length < 8) {
    return { status: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  if (!email.match(emailTest)) {
    return { status: 400, message: '"email" must be a valid email' };
  }
  if (password.length < 6) {
    return { status: 400, message: '"password" length must be 6 characters long' };
  }
};

const validateLogin = (email, password) => {
  if (email === '') {
    return { status: 400, message: '"email" is not allowed to be empty' };
  }
  if (password === '') {
    return { status: 400, message: '"password" is not allowed to be empty' };
  }
  if (!email) return { status: 400, message: '"email" is required' };
  if (!password) return { status: 400, message: '"password" is required' };
};

const createUser = async (displayName, email, password, image) => {
  const errorTest = validateRegister(displayName, email, password);

  if (errorTest) return errorTest;

  const oldUser = await User.findOne({ where: { email } });

  if (oldUser) return { status: 409, message: 'Usuário já existe' };

  await User.create({ displayName, email, password, image });

  const jwtLogin = { expiresIn: '10m', algorithm: 'HS256' };
  const token = jwt.sign({ data: email }, secret, jwtLogin);

  return { token };
};

const loginUser = async (email, password) => {
  const errorTest = validateLogin(email, password);

  if (errorTest) return errorTest;

  const user = await User.findOne({ where: { email } });

  if (!user) return { status: 400, message: 'Campos inválidos' };

  const jwtLogin = { expiresIn: '10m', algorithm: 'HS256' };
  const token = jwt.sign({ data: email }, secret, jwtLogin);

  return { token };
};

const callUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });

  return users;
};

const callUserId = async (id) => {
  const user = await User.findOne({ where: { id } }, { attributes: { exclude: 'password' } });

  if (!user) return { status: 404, message: 'Usuário não existe' };

  return user;
};

const deleteUser = async (email) => {
  await User.destroy({ where: { email } });

  const user = await User.findOne({ where: { email } });

  if (user) return { status: 400, message: 'Usuário não excluído' };
};

module.exports = {
  createUser,
  loginUser,
  callUsers,
  callUserId,
  deleteUser,
};
