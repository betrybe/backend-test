const jwt = require('jsonwebtoken');

module.exports = function createToken(email) {
  const signOptions = {
    algorithm: 'HS256',
    expiresIn: '2d',
  };
  const userWithNoPassword = { email };
  const token = jwt.sign(userWithNoPassword, 'toquinho', signOptions);
  return token;
};
