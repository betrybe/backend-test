const jwt = require('jsonwebtoken');
const SECRET = require('./SECRET');
require('dotenv').config();

const createToken = (displayName, email, image) => {
  const userObject = { displayName, email, image };
  const token = jwt.sign(userObject, SECRET, {
    expiresIn: '30m',
    algorithm: 'HS256',
  });
  return token;
};

module.exports = createToken;
