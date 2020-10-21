const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const Boom = require('boom');

const { SECRET = 'preguicadecriarumsegredo' } = process.env;

module.exports = () => rescue(
  async (req, _res, next) => {
    const { authorization: token } = req.headers;

    if (!token) return next(Boom.unauthorized('Token não encontrado'));

    try {
      const { data: user } = jwt.verify(token, SECRET);

      req.user = user;

      return next();
    } catch (err) {
      return next(Boom.unauthorized('Token expirado ou inválido'));
    }
  },
);
