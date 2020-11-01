const jwt = require('jsonwebtoken');
require('dotenv/config');

const SECRET = process.env.SECRET;

const jwtConfig = {expiresIn: '2d', algorithm: 'HS256' };
const tokenValid = (userdata) => {
  const token = jwt.sign(userdata, SECRET, jwtConfig);
  return token;
};

module.exports = { tokenValid };
