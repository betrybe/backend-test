const { Router } = require('express');
const JWT = require('jsonwebtoken');
const { User } = require('../models');
const configValidade = require('./userConfig');
const { secret } = require('../auth/authConfig');
const authMiddleware = require('../auth/authMiddleware');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const userActions = Router();

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
      return res.status(500).send({ message: 'Algo deu errado' });
    });
  if (emailAlreadyExists) {
    return res.status(409).send({ message: 'Usuário já existe' });
  }

  // Se passou em todos os testes e validações, cadastre o novo usuário
  User.create({ displayName, email, password, image })
    .then(() => {
      const token = JWT.sign({ email, password }, secret, jwtConfig);
      return res.status(201).json({ token });
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Algo deu errado' });
    });
});

userActions.get('/', authMiddleware, async (req, res) => {
  User.findAll()
    .then((result) => res.status(200).send(result))
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Algo deu errado' });
    });
});

userActions.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  User.findOne({ where: { id } })
    .then((result) => {
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(404).send({ message: 'Usuário não existe' });
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Algo deu errado' });
    });
});

userActions.delete('/me', authMiddleware, async (req, res) => {
  User.destroy({ where: { email: req.user.email } })
    .then(() => res.status(204).end())
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = {
  configValidade,
  secret,
  userActions,
  validateDisplayName,
  validateEmail,
  validatePassword,
  verifyRegistedEmail,
};
