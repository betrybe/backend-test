const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'thisisverysecret';

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const { data } = decoded;

    const user = await User.findByPk(data);

    if (!user) {
      return res.status(401).json({ message: 'User does not exists' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = auth;
