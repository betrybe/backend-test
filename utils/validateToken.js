const jwt = require('jsonwebtoken');

const secret = 'wowsuchasafesecret';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  jwt.verify(token, secret, (err, userData) => {
    if (err) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }
    req.user = userData;
    next();
  });
};
