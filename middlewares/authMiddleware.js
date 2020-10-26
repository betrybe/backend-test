const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mirellasproject';

module.exports = async (req, res, next) => {
  const token = req.headears.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload) return res.status(401).json({ message: 'invalid token' });
    req.user = token;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
