const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = process.env.SECRET || 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const { user: { dataValues: { id } } } = jwt.verify(token, secret);
    const user = await Users.findOne({ where: { id } });
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuario do token.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
