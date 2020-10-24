require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const jwtConfig = { algorithm: 'HS256' };

const GenerateToken = (userdata) => {
  const token = jwt.sign(userdata, secret, jwtConfig);
  return token;
};

module.exports = { GenerateToken };
