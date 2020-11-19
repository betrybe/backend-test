const { createToken, secret } = require('./createToken');
const verifyToken = require('./verifyToken');

module.exports = {
  createToken,
  verifyToken,
  secret,
};
