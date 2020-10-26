const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenHandler = (token, next) => {
  try {
    const JWT_SECRET = process.env.SECRET || 'blogsApiSecret';
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next({ status: 401, message: err.message });
  }
};

const auth = (required) => async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!required) return next();
  if (!authorization) return next({ status: 401, message: 'Usuário não logado' });
  req.user = tokenHandler(authorization, next);
  return next();
};

module.exports = auth;
