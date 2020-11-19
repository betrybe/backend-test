const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { User } = require('../models');
const { secret } = require('./createToken');

module.exports = rescue(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  try {
  const decoded = jwt.verify(token, secret);
  console.log('decoder:', decoded);
  const user = await User.findAll({ where: { email: decoded.email } });
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado'});
  req.user = decoded;
  next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  }
);

/* const jwt = require('jsonwebtoken');
const { secret } = require('./createToken');
// const { User } = require('../models');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log('vereifi2', token);
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    const payload = jwt.verify(token, secret, (err) => {
      if(err) console.log('Erro no', err);
    });
    console.log('tudo certo!', payload);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = verifyToken;
*/
