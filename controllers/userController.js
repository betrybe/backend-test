const rescue = require('express-rescue');
const { Users } = require('../models');
const JWT = require('jsonwebtoken');


const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

/*
o secret deveria estar no .env porém para ser avaliado evaluator da trybe no github é necessário
ficar aqui
*/
const secret = 'minhaSenhaSuperSecretaBlogApi';

const regexEmail = /\S+@\w+\.\w{2,6}(\.\w{2})?/;
const regexPassword = /\d{6,}/;

const validateName = ( displayName ) => {
  if (displayName.length < 8) {
    return { code: 400, message: 'displayName length must be at least 8 characters long' }
  }
}

const validateEmail = ( email ) => {
  if (!email) {
    return { code: 400, message: 'email is required' }
  }
  if (!regexName.test(email)) {
    return { code: 400, message: 'email must be a valid email' }
  }
}

const validatePassword = ( password ) => {
  if (!password) {
    return { code: 400, message: 'password is required' }
  }
  if (password.length < 6) {
    return { code: 400, message: 'password length must be at least 6 characters long' }
  }
}

const findUser = (email) => {
  if (Users.findAll({ email })) {
    return { code: 409, message: 'Usuário já existe'}
  }
};


const createNewUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const isNameNotValid = validateName(displayName);

  if (isNameNotValid) return res.status(400).json({ message: isNameNotValid.message })

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isThereUser = findUser(email);


  Users.create({ displayName, email, password, image })
  .then((user) => {})

  const token = jwt.sign({ displayName, email, password, image }, secret, jwtConfig);
  res.status(201).json({ token });

};
