require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY || 'l2UPGGeOuHP5cS1lhofe';

module.exports = async (userObj) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const { password, ...user } = userObj;
  const token = await jwt.sign({ user }, secret, jwtConfig);
  return token;
};
