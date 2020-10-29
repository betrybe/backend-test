require('dotenv/config');
const { users } = require('../models');
const validateToken = require('./validateToken');

const validateName = (name) => name.length >= 8;

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

const checkEmailEmpty = (email) => email === '';

const checkPasswordEmpty = (password) => password === '';

const checkUserExist = async (email) => {
  const UserFound = await users.findAll({ where: { email } });
  return UserFound.length > 0;
};

const checkUserDb = async (email, password) => {
  const UserFound = await users.findAll({ where: { email, password } });
  console.log(UserFound.length > 0);
  return UserFound.length > 0;
};

const getAllUsers = async () => users.findAll();

module.exports = {
  validateName,
  validateEmail,
  checkUserExist,
  checkEmailEmpty,
  checkPasswordEmpty,
  checkUserDb,
  getAllUsers,
};
