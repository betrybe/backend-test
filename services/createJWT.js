const jwt = require('jsonwebtoken');
require('dotenv').config();

const createJWT = ({ id, displayName, email }) => {
  const jwtConfig = { expiresIn: '50min', algorithm: 'HS256' };

  const token = jwt.sign({ id, displayName, email }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

module.exports = createJWT;
