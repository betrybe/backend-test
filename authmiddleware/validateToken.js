require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = process.env.SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findOne({
      where: {
        email: decoded.email,
        password: decoded.password
      }
    });
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' })
  }
};