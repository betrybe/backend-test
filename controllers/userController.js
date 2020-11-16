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
  if (typeof email === 'string' && email.length === 0) { return { code: 400, message: '"email" is not allowed to be empty' }; }
  if (!email) {
    return { code: 400, message: '"email" is required' };
  }
  if (!regexEmail.test(email)) {
    return { code: 400, message: '"email" must be a valid email' };
  }
};

const validatePassword = (password) => {
  if (typeof password === 'string' && password.length === 0) { return { code: 400, message: '"password" is not allowed to be empty' }; }
  if (!password) {
    return { code: 400, message: '"password" is required' };
  }
  if (password.toString().length < 6) {
    return { code: 400, message: '"password" length must be 6 characters long' };
  }
};

const findUser = async (email) => {
  const foundUser = (await Users.findAll({ where: { email } }));
  if (foundUser.length > 0) {
    return { code: 409, message: 'Usuário já existe' };
  }
};

const getUser = async (email) => {
  const gotUser = (await Users.findAll({ where: { email } }));
  if (gotUser.length === 0) {
    return { code: 400, message: 'Campos inválidos' };
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

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const isEmailNotValid = validateEmail(email);
  if (isEmailNotValid) {
    return res.status(isEmailNotValid.code).json({ message: isEmailNotValid.message });
  }
  const isPasswordNotValid = validatePassword(password);
  if (isPasswordNotValid) {
    return res.status(isPasswordNotValid.code).json({ message: isPasswordNotValid.message });
  }
  const isThereUser = await getUser(email, password);
  if (isThereUser) return res.status(isThereUser.code).json({ message: isThereUser.message });
  const token = JWT.sign({ password, email }, secret, jwtConfig); res.status(200).json({ token });
});

const getAllUsers = rescue(async (_req, res) => {
  Users.findAll({ raw: true }).then((users) => res.status(200).json(users));
});

const getUserById = rescue(async (req, res) => {
  await Users.findByPk(req.params.id).then((user) => ((!user)
    ? res.status(404).json({ message: 'Usuário não existe' })
    : res.status(200).json(user)));
});

const deleteSelfUser = rescue(async (req, res) => {
  const { email } = req.user;
  Users.destroy({ where: { email } }).then(() => res.status(204).json());
});

module.exports = {
  createNewUser,
  userLogin,
  secret,
  getAllUsers,
  getUserById,
  deleteSelfUser,
};