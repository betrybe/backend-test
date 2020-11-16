const jwt = require('jsonwebtoken');

const { secret } = require('../controllers/userController');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token não encontrado' });
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    if (decoded) next();
  } catch {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};