const { User } = require('../models');

const validateName = (displayName) => {
  if (displayName.length < 8) return { error: { message: '"displayName" length must be at least 8 characters long', statusCode: 400 } };

  return null;
};

const emailUnicyValidation = async (email) => {
  const sameEmail = await User.findAll({ where: { email } });

  if (sameEmail.length > 0) return false;

  return true;
};

const validateEmail = async (email) => {
  if (!email) return { error: { message: '"email" is required', statusCode: 400 } };
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  const isEmailValid = emailPattern.test(email);
  if (!isEmailValid) return { error: { message: '"email" must be a valid email', statusCode: 400 } };
  const emailUnicy = await emailUnicyValidation(email);
  if (!emailUnicy) return { error: { message: 'Usuário já existe', statusCode: 409 } };
};

const validatePassword = (password) => {
  if (!password) return { error: { message: '"password" is required', statusCode: 400 } };
  if (password.length < 6) return { error: { message: '"password" length must be 6 characters long', statusCode: 400 } };

  return null;
};

const validateUser = async (displayName, email, password) => {
  const pwdValidation = validatePassword(password);
  if (pwdValidation) return pwdValidation;

  const nameValidation = validateName(displayName);
  if (nameValidation) return nameValidation;

  const emailValidation = await validateEmail(email);
  if (emailValidation) return emailValidation;

  return true;
};

const createUser = async (displayName, email, password, image) => {
  const userValidation = await validateUser(displayName, email, password);
  if (userValidation.error) return userValidation;
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

module.exports = { createUser };
