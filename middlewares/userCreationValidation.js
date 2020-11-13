const boom = require('@hapi/boom');

module.exports = (req, _res, next) => {
  const { displayName, email, password, image } = req.body;

  switch (true) {
    case displayName.length < 8:
      return next(boom
        .badRequest('"displayName" length must be at least 8 characters long'));
    case !email:
      return next(boom.badRequest('"email" is required'));
    case !/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email):
      return next(boom.badRequest('"email" must be a valid email'));
    case !password:
      return next(boom.badRequest('"password" is required'));
    case !/[a-z0-9]{6,}/.test(password):
      return next(boom.badRequest('"password" length must be 6 characters long'));
    default:
      req.userInfo = { displayName, email, password, image };
      next();
  }
};
