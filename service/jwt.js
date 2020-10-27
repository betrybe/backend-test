const jwt = require('jsonwebtoken');
require('dotenv/config');

const SECRET = process.env.SECRET;
const jwtConfig = { algorithm: 'HS256' };
const GenerateToken = (userdata) => {
  const token = jwt.sign(userdata, SECRET, jwtConfig);
  return token;
};

module.exports = { GenerateToken };
