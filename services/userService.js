const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'thisisverysecret';
const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const validateSignUp = (name, email, password) => {
  if (name.length < 8) {
    return { status: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  if (!email.match(emailTest)) {
    return { status: 400, message: '"email" must be a valid email' };
  }
  if (password.length < 6) {
    return { status: 400, message: '"password" length must be 6 characters long' };
  }
  return null;
};

const checkingLoginFields = (email, password) => {
  if (!email) return { status: 400, message: '"email" is required' };
  if (!password) return { status: 400, message: '"password" is required' };
  return null;
};

const newUser = async (name, email, password, img) => {
  const missing = checkingLoginFields(email, password);

  if (missing) return missing;

  const error = validateSignUp(name, email, password);

  if (error) return error;

  const user = await User.findOne({ where: { email } });

  if (user) return { status: 409, message: 'Usuário já existe' };

  const created = await User.create({ displayName: name, email, password, image: img });

  const jwtLogin = { expiresIn: '30m', algorithm: 'HS256' };
  const token = jwt.sign({ data: created.id }, secret, jwtLogin);

  return { token };
};

const login = async (email, password) => {
  if (email.length < 1) return { status: 400, message: '"email" is not allowed to be empty' };
  if (password.length < 1) return { status: 400, message: '"password" is not allowed to be empty' };

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) return { status: 400, message: 'Campos inválidos' };

  const jwtLogin = { expiresIn: '30m', algorithm: 'HS256' };
  const token = jwt.sign({ data: user.id }, secret, jwtLogin);

  return { token };
};

const listUsers = async () => User.findAll({ attributes: { exclude: 'password' } });

const findUser = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: 'password' } });

  if (!user) return { status: 404, message: 'Usuário não existe' };

  return user;
};

const deleteUser = async (id) => User.destroy({ where: { id } });

module.exports = {
  newUser,
  login,
  listUsers,
  findUser,
  deleteUser,
};
