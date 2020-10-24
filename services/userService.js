const { User } = require('../models');
const { createError } = require('../helpers/errorHelper');
const { verifyUserInfo } = require('../helpers/helperFunctions');

const userRegister = async (displayName, email, password, image) => {
  const infoValidation = verifyUserInfo(displayName, email, password);

  if (infoValidation.error) return infoValidation;

  const alreadyUser = await User.findAll({ where: { email } });
  if (alreadyUser.length) return createError(409, 'Usuário já existe');

  const newUser = User.create({ displayName, email, password, image });
  return newUser;
};

const findAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const findUserById = async (id) => {
  const response = await User.findByPk(id);

  if (!response) return createError(404, 'Usuário não existe');

  return response;
};

module.exports = {
  userRegister,
  findAllUsers,
  findUserById,
};
