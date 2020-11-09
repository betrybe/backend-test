const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const User = require('../models/Users');

const generateToken = (userData) => {
  const { password, ...data } = userData;
  const SECRET = 'alaoluisefera';
  const JWTCONFIG = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(data, SECRET, JWTCONFIG);
  return token;
};

const validateName = (name) => {
  if (name && name.length < 8) {
    return {
      ok: false,
      status: 400,
      message: '"displayName" length must be at least 8 characters long',
    };
  }
  return { ok: true };
};

const validadeEmail = async (email) => {
  if (!email) return { ok: false, status: 400, message: '"email" is required' };
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    ? { ok: true }
    : { ok: false, status: 400, message: '"email" must be a valid email' };
};

const validatePassword = (pass) => {
  if (!pass) return { ok: false, status: 400, message: '"password" is required' };
  return pass.length < 6
    ? { ok: false, status: 400, message: '"password" length must be 6 characters long' }
    : { ok: true };
};

const validateImage = (image) => {
  if (image) return { ok: true };
  return { ok: false, status: 400, message: '"image" is required' };
};

const validadeLogin = (email, password) => {
  switch (true) {
    case email === '':
      return { ok: false, status: 400, message: '"email" is not allowed to be empty' };
    case password === '':
      return { ok: false, status: 400, message: '"password" is not allowed to be empty' };
    case !email:
      return { ok: false, status: 400, message: '"email" is required' };
    case !password:
      return { ok: false, status: 400, message: '"password" is required' };
    default:
      return { ok: true, status: 200, message: 'Loged with success' };
  }
};

const registerUser = async (displayName, email, password, image) => {
  const validEmail = await validadeEmail(email);
  const validName = validateName(displayName);
  const validPassword = validatePassword(password);
  const validImage = validateImage(image);
  switch (false) {
    case validName.ok:
      return validName;
    case validEmail.ok:
      return validEmail;
    case validPassword.ok:
      return validPassword;
    case validImage.ok:
      return validImage;
    default:
      break;
  }
  const createdUser = await Users.create({ displayName, email, password, image })
    .then((res) => {
      const token = generateToken(res.dataValues);
      return { ok: true, status: 201, message: 'Usuário válido', token };
    })
    .catch((err) => ({ ok: false, status: 409, message: 'Usuário já existe', err }));
  return createdUser;
};

const getAllUsers = async () => Users.findAll();

const login = async (email, password) => {
  const validated = validadeLogin(email, password);
  if (!validated.ok) return validated;
  const user = await Users.findOne({ where: { email } });
  if (!user) return { ok: false, status: 400, message: 'Campos inválidos' };
  const token = generateToken(user);
  return { ...validated, token };
};

module.exports = { getAllUsers, registerUser, login };
