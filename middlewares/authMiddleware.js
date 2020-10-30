const verifyJWT = require('../services/verifyJWT');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'missing auth token' });

    const payload = verifyJWT(token);
    req.user = payload;
    next();
  } catch (err) {
    console.log('jwt linha12', err.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
