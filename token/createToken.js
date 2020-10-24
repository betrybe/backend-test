const jwt = require('jsonwebtoken');

module.exports = function createToken(id, displayName, email, image) {
  const signOptions = {
    algorithm: 'HS256',
    expiresIn: '2d',
  };
  const userWithNoPassword = { id, displayName, email, image };
  const token = jwt.sign(userWithNoPassword, 'toquinho', signOptions);
  return token;
};
