const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.SECRET;

module.exports = (userInfo) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const { password, ...user } = userInfo;
  const token = jwt.sign({ user }, secret, jwtConfig);
  return token;
};
