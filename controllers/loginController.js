const { Router } = require('express');
const JWT = require('jsonwebtoken');
const {
  validateEmail,
  validatePassword,
  verifyRegistedEmail,
  configValidade,
} = require('./userController');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const secret = 'Marco Barbosa 2020 147258';

const loginActions = Router();

loginActions.post('/', async (req, res) => {
  const { email, password } = req.body;
  // campos obrigatórios -  A ordem dos tratores altera o viaduto neste caso
  if (email === '') {
    return res.status(400).send({
      message: '"email" is not allowed to be empty',
    });
  }
  if (!email) {
    return res.status(400).send({
      message: '"email" is required',
    });
  }
  if (password === '') {
    return res.status(400).send({
      message: '"password" is not allowed to be empty',
    });
  }
  if (!password) {
    return res.status(400).send({
      message: '"password" is required',
    });
  }
  // Validações
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
  if (!emailAlreadyExists) {
    return res.status(400).send({ message: 'Campos inválidos' });
  }
  const user = emailAlreadyExists.dataValues;

  if (user.email === email && user.password === password.toString()) {
    const token = JWT.sign({ email, password }, secret, jwtConfig);
    return res.status(200).send({ token });
  }
  return res.status(400).send({ message: 'Campos inválidos' });
});

module.exports = loginActions;
