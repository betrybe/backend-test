const jwt = require('jsonwebtoken');

const SECRET = 'DiegoRafael-sd03';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const payload = jwt.verify(token, SECRET);
    const verifyUser = await userModel.findUserByEmail(payload.email);
    if (!verifyUser) return res.status(401).json({ message: 'user not found' });
    req.user = verifyUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
