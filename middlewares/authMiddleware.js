const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { User } = require('../models');

const JWT_SECRET = 'toquinho';

module.exports = rescue(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const { email } = jwt.verify(token, JWT_SECRET);
    const user = await User.findAll({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token expirado ou inválido' });
  }
});
