const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');

const generateJWT = (data, { secret, jwtConfig }) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return { token };
};

const validateJWT = ({ User }, { secret }) =>
  rescue(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'missing auth token' });

    try {
      const decoded = jwt.verify(token, secret);

      const {
        data: { id },
      } = decoded;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(401).json({ message: 'invalid token' });
      }

      const { _password, ...userData } = user;

      req.user = userData;

      return next();
    } catch (err) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
  });

const getValidateJWT = (models, config) => validateJWT(models, config);

module.exports = {
  generateJWT,
  getValidateJWT,
};
