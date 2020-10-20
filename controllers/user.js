const rescue = require('express-rescue');
const Boom = require('boom');
const { User } = require('../services');

const validate = (type = 'login') => rescue(async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const officialType = `validateUser${type[0].toUpperCase() + type.slice(1)}`;

  const { message } = await User[officialType]({ email, password, displayName });

  if (message) return next(Boom.badRequest(message));

  next();
});

const register = rescue(async (req, _res, next) => {
  const { displayName, email, image, password } = req.body;

  const { message } = await User.isEmailAvaible(email);
  if (message) return next(Boom.conflict(message));

  const user = await User.createUser({ displayName, email, image, password });

  req.user = user;
  req.status = 201;

  return next();
});

const getUserByEmail = rescue(async (req, _res, next) => {
  const { email } = req.body;

  const { message, ...user } = await User.getUserByEmail(email);

  req.message = message;
  req.user = message ? null : user;

  next();
});

module.exports = {
  register,
  validate,
  getUserByEmail,
};
