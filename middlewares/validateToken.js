const jwt = require('jsonwebtoken');

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next('no_token');
  const handleError = (err, decoded) => {
    if (err) return next('token_error');
    return decoded;
  };
  const user = jwt.verify(authorization, 'paodebatata', handleError);
  req.user = user;
  next();
};

module.exports = validateToken;
