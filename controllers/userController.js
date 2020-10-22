const { Router } = require('express');
const JWT = require('jsonwebtoken');
const { User } = require('../models');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const secret = 'Marco Barbosa 2020 147258';

const userActions = Router();

const configValidade = {
  passwordLength: 6,
  minCharLength: 8,
  regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
};

const validateDisplayName = (minCharLength, displayName) => {
  if (displayName.length < minCharLength) {
    return {
      message: '"displayName" length must be at least 8 characters long',
    };
  }
};

const validateEmail = (regex, email) => {
  if (!regex.test(email)) {
    return {
      message: '"email" must be a valid email',
    };
  }
};

const validatePassword = (passwordLength, password) => {
  if (password.length < passwordLength) {
    return {
      message: '"password" length must be 6 characters long',
    };
  }
};

const verifyRegistedEmail = async (email) => User.findOne({ where: { email } });

userActions.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  // campos obrigatórios
  if (!email) {
    return res.status(400).send({
      message: '"email" is required',
    });
  }
  if (!password) {
    return res.status(400).send({
      message: '"password" is required',
    });
  }

  // validações
  const checkDisplayName = validateDisplayName(configValidade.minCharLength, displayName);
  if (checkDisplayName) return res.status(400).send(checkDisplayName);
  const checkEmail = validateEmail(configValidade.regex, email);
  if (checkEmail) return res.status(400).send(checkEmail);
  const checkPassword = validatePassword(configValidade.passwordLength, password);
  if (checkPassword) return res.status(400).send(checkPassword);

  // Usuário já cadastrado?
  const emailAlreadyExists = await verifyRegistedEmail(email)
    .then((response) => response)
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
  if (emailAlreadyExists) {
    return res.status(409).send({ message: 'Usuário já existe' });
  }

  // Se passou em todos os testes e validações, cadastre o novo usuário
  User.create({ displayName, email, password, image })
    .then(() => {
      const token = JWT.sign({ displayName, email, password, image }, secret, jwtConfig);
      res.status(201).json({ token });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = userActions;
