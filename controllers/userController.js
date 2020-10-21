const rescue = require('express-rescue');
const JWT = require('jsonwebtoken');
const { Users } = require('../models');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const secret = 'minhaSenhaSuperSecretaBlogApi';

const regexEmail = /\S+@\w+\.\w{2,6}(\.\w{2})?/;

const validateName = (displayName) => {
  if (displayName.length < 8) {
    return { code: 400, message: '"displayName" length must be at least 8 characters long' };
  }
};

const validateEmail = (email) => {
  if (!email) {
    return { code: 400, message: '"email" is required' };
  }
  if (!regexEmail.test(email)) {
    return { code: 400, message: '"email" must be a valid email' };
  }
};

const validatePassword = (password) => {
  if (!password) {
    return { code: 400, message: '"password" is required' };
  }
  if (password.toString().length < 6) {
    return { code: 400, message: '"password" length must be 6 characters long' };
  }
};

const findUser = async (email) => {
  const teste = (await Users.findAll({ where: { email } }));
  if (teste.length > 0) {
    return { code: 409, message: 'Usuário já existe' };
  }
};

const createNewUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const isNameNotValid = validateName(displayName);
  if (isNameNotValid) {
    return res.status(isNameNotValid.code)
      .json({ message: isNameNotValid.message });
  }

  const isEmailNotValid = validateEmail(email);
  if (isEmailNotValid) {
    return res.status(isEmailNotValid.code)
      .json({ message: isEmailNotValid.message });
  }

  const isPasswordNotValid = validatePassword(password);
  if (isPasswordNotValid) {
    return res.status(isPasswordNotValid.code)
      .json({ message: isPasswordNotValid.message });
  }

  const isThereUser = await findUser(email);
  if (isThereUser) return res.status(isThereUser.code).json({ message: isThereUser.message });

  Users.create({ displayName, email, password, image });

  const token = JWT.sign({ displayName, email, password, image }, secret, jwtConfig);
  res.status(201).json({ token });
});

module.exports = {
  createNewUser,
};
