const jwt = require('jsonwebtoken');
const SECRET = require('./SECRET');
require('dotenv').config();

const createToken = (id) => {
  const token = jwt.sign({ ...id }, SECRET, {
    expiresIn: '180m',
    algorithm: 'HS256',
  });
  return token;
};

module.exports = createToken;
