const boom = require('@hapi/boom');

module.exports = (req, _res, next) => {
  const { email, password } = req.body;

  switch (true) {
    case !email && email !== '':
      return next(boom.badRequest('"email" is required'));
    case !/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email):
      return next(boom.badRequest('"email" is not allowed to be empty'));
    case !password && password !== '':
      return next(boom.badRequest('"password" is required'));
    case !/[a-z0-9]{6,}/.test(password):
      return next(boom.badRequest('"password" is not allowed to be empty'));
    default:
      next();
  }
};
