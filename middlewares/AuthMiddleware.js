require('dotenv/config');
const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { User } = require('../models');

const secret = process.env.SECRET;

module.exports = rescue(async (req, res, next) => {
  const token = req.headers.authorization;

  //* Verificações se existe token e se o token é valido.
  if (!token) {
    const error = { error: { status: 401, message: 'Token não encontrado' } };
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await User.findOne({
      where: { email: decoded.email, password: decoded.password },
    });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
});
