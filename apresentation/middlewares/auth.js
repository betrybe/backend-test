const jwt = require('jsonwebtoken');

const SECRET = 'UNEXPECTED THIS';

async function Auth(req, res, next) {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Missing auth token' });

  try {
    const objToken = jwt.verify(token, SECRET);
    const tokenToUser; // call in bank to check user exist?
    if (!tokenToUser) res.status(401).json({ message: 'user not found' });

    req.user = token;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
}

module.exports = Auth;
