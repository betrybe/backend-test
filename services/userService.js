const { User } = require('../models');

const createError = (status, message) => ({ error: { status, message } });

const verifyName = (displayName) => {
  if (displayName.length < 8) {
    return createError(400, '"displayName" length must be at least 8 characters long');
  }
  return false;
};

const verifyEmail = (email) => {
  if (!email) {
    return createError(400, '"email" is required');
  }
  if (!email.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)) {
    return createError(400, '"email" must be a valid email');
  }

  return false;
};

const verifyPassword = (password) => {
  if (!password) {
    return createError(400, '"password" is required');
  }
  if (password.toString().length < 6) {
    return createError(400, '"password" length must be at least 6 characters long');
  }

  return false;
};

const verifyUserInfo = (displayName, email, password) => {
  const validName = verifyName(displayName);
  const validEmail = verifyEmail(email);
  const validPassword = verifyPassword(password);

  if (validName.error) return validName;
  if (validEmail.error) return validEmail;
  if (validPassword.error) return validPassword;

  return false;
};

const userRegister = async (displayName, email, password, image) => {
  const infoValidation = verifyUserInfo(displayName, email, password);

  if (infoValidation.error) return infoValidation;

  const alreadyUser = await User.findAll({ where: { email } });
  if (alreadyUser.length) return { error: { status: 409, message: 'Usuário já existe' } };

  const newUser = User.create({ displayName, email, password, image });
  return newUser;
};

module.exports = {
  userRegister,
};
