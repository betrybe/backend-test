const jwt = require('jsonwebtoken');
const SECRET = require('./SECRET');
require('dotenv').config();

const createToken = (email) => {
  const userObject = { email };
  const token = jwt.sign(userObject, SECRET, {
    expiresIn: '30m',
    algorithm: 'HS256',
  });
  return token;
};

module.exports = createToken;
