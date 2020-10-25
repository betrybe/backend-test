const { Users } = require('../models/Users');

const validateName = (displayName) => {
  if (typeof displayName !== 'string'
    && displayName.length < 8) return { error: 'invalid username' };

  return null;
};

const emailUnicyValidation = async (email) => {
  const sameEmail = await Users.findAll({ where: { email } });

  if (sameEmail.length > 0) return false;

  return true;
};

const validateEmail = (email) => {
  const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  const isEmailValid = emailPattern.test(email);
  if (!isEmailValid) return { error: 'email invalido' };
  const emailUnicy = emailUnicyValidation(email);
  if (!emailUnicy) return { error: 'Usuário já existe' };
};

const validatePassword = (password) => {
  if (password.length < 6) return { error: 'invalid password' };

  return null;
};

const validateUser = (userData) => {
  const { displayName, email, password } = userData;
  const pwdValidation = validatePassword(password);
  if (pwdValidation) return pwdValidation.error;
  const nameValidation = validateName(displayName);
  if (nameValidation) return nameValidation.error;
  const emailValidation = validateEmail(email);
  if (emailValidation) return emailValidation.error;
  return null;
};

module.exports = { validateUser };
