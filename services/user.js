const { users } = require('../models');

const validateName = (name) => name.length >= 8;

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

// const validatePassword = (password) => password.length <= 6;

const checkUserExist = async (email) => {
  const UserFound = await users.findAll({ where: { email } });
  return UserFound.length > 0;
};

module.exports = {
  validateName,
  validateEmail,
  // validatePassword,
  checkUserExist,
};
