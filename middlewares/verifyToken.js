const jwt = require('jsonwebtoken');
const { secret } = require('./createToken');
// const { User } = require('../models');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log('vereifi2', token);
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = verifyToken;
