const jwt = require('jsonwebtoken');

const { User } = require('../models');

const SECRET = '1q2w3e4r';

const JWTCONFIG = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const userCreation = async ({ displayName, email, password, image }) => {
  const userExist = await User.findAll({ where: { email } });

  if (userExist.length > 0) return;

  const userCreated = await User.create({ displayName, email, password, image });

  return userCreated;
};

const userLogin = async ({ email, password }) => {
  const logedUser = await User.findOne({ where: { email }, raw: true });

  if (!logedUser) return;

  const { id, displayName, email: userEmail, password: userPassoword } = logedUser;

  if (password !== userPassoword) return;

  const token = jwt.sign({ id, displayName, userEmail }, SECRET, JWTCONFIG);
  return token;
};

const getAlluser = async () => {
  const allUser = await User.findAll({});

  return allUser;
};

module.exports = {
  userCreation,
  userLogin,
  getAlluser,
};
