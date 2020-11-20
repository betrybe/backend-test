const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { User } = require('../models');
const { secret } = require('./createToken');

module.exports = rescue(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findAll({ where: { email: decoded.email } });
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
});
