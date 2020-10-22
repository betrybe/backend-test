const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const Joi = require('joi');
const Boom = require('boom');
const { Users } = require('../models');

const jwtTokenSchema = Joi.string() // regex: https://github.com/sideway/joi/issues/992
  .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
  .error(() => new Error('Token expirado ou inválido'));

const secret = 'meu1segredo2seguro3';

module.exports = rescue(async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(Boom.unauthorized('Token não encontrado'));

  const { error } = jwtTokenSchema.validate(token);

  if (error) return next(Boom.unauthorized(error));

  const decoded = jwt.verify(token, secret);

  const user = await Users.findAll({ where: { email: decoded.user.dataValues.email } });

  if (!user) return next(Boom.notFound('Usuário não encontrado!'));

  req.user = user[0].dataValues;

  next();
});
