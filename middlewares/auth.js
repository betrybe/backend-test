const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');

const generateJWT = (data, { secret, jwtConfig }) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return { token };
};

const validateJWT = ({ Users }, { secret }) =>
  rescue(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token não encontrado' });

    try {
      const decoded = jwt.verify(token, secret);

      const {
        data: { email },
      } = decoded;

      const user = await Users.findAll({ where: { email }, raw: true });

      const userExists = user.length > 0;

      if (!userExists) {
        return res.status(401).json({ message: 'Token expirado ou inválido' });
      }

      const { _password, ...userData } = user[0];

      req.user = userData;

      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }
  });

const getValidateJWT = (models, config) => validateJWT(models, config);

module.exports = {
  generateJWT,
  getValidateJWT,
};
