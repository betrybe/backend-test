const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  console.log('payload:', payload);
  return payload;
};

module.exports = verifyJWT;
