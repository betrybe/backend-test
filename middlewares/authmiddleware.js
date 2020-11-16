const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const { User } = require('../models');

const JWT_SECRET = '1q2w3e4r';

module.exports = (required = true) => async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!required) return next();

  if (required && !token) return next(boom.unauthorized('Token não encontrado'));

  try {
    const { userEmail: email } = jwt.verify(token, JWT_SECRET);

    const user = await User.findAll({ where: { email } });

    req.user = user[0].dataValues;
    next();
  } catch (err) {
    console.log(err)
    return next(boom.unauthorized('Token expirado ou inválido'));
  }
};
