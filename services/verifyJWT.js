const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  return payload;
};

module.exports = verifyJWT;
