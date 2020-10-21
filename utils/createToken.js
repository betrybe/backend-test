const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (displayName, email, image) => {
  const userObject = { displayName, email, image };
  const token = jwt.sign(userObject, process.env.SECRET, {
    expiresIn: '30m',
    algorithm: 'HS256',
  });
  return token;
};

module.exports = createToken;
