const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const { SECRET = 'segredoinquebravel' } = process.env;

module.exports = () =>
  rescue(async (req, _res, next) => {
    const { authorization: token } = req.headers;

    if (!token) return next(boom.unauthorized('Token não encontrado'));

    try {
      const { data: user } = jwt.verify(token, SECRET);

      req.user = user;

      return next();
    } catch (err) {
      return next(boom.unauthorized('Token expirado ou inválido'));
    }
  });
