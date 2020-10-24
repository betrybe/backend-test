const { User } = require('../models');
const { createError } = require('../helpers/errorHelper');
const { verifyUserInfo } = require('../helpers/helperFunctions');

const validateLogin = async (email, password) => {
  const validateInfo = verifyUserInfo('login verification', email, password);

  if (validateInfo.error) return validateInfo;

  const findUser = await await User.findAll({ where: { email } });

  if (!findUser.length) return createError(400, 'Campos inválidos');

  return findUser;
};

module.exports = {
  validateLogin,
};
