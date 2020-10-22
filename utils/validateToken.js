const jwt = require('jsonwebtoken');
const SECRET = require('./SECRET');

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    jwt.verify(token, SECRET, (err, userData) => {
      if (err) {
        return res.status(401).json({ message: 'Token expirado ou inválido' });
      }
      req.token = token;
      req.user = userData;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
};

module.exports = validateToken;
