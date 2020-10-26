require('dotenv/config');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const jwtConfig = {
  expiresIn: process.env.EXPIRES_IN || '2d',
  algorithm: process.env.ALGORITHM || 'HS256',
};

const secret = process.env.SECRET || 'ronaldinho';

const generateJWT = (data) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return token;
};

const validateJWT = rescue(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) res.status(401).json({ message: 'Token não encontrado' });
  try {
    const decode = jwt.verify(auth, secret);
    const {
      data: { email },
    } = decode;
    const user = await Users.findAll({ where: { email } }); // ver a resposta
    console.log('depois do await');
    if (!user) res.status(401).json({ message: 'Token expirado ou inválido' });
    const { _password, ...userData } = user[0]; //  muda de acordo com a reposta do service
    req.user = userData;
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Token expirado ou inválido' });
  }
});

module.exports = {
  generateJWT, validateJWT,
};
