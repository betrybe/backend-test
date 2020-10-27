const { users } = require('../models');

const validateName = (name) => name.length >= 8;

const validateEmail = (email) => {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validatePassword = (password) => password >= 6;

const checkUserExist = async (email) => {
  const UserFound = await users.findAll({ where: { email } });
  return UserFound.length > 0;
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  checkUserExist,
};
