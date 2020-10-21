const jwt = require('jsonwebtoken');

module.exports = function createToken(displayName, email, id) {
  const signOptions = {
    algorithm: 'HS256',
    expiresIn: '2d',
  };
  const userWithNoPassword = { displayName, email, id };
  const token = jwt.sign(userWithNoPassword, 'paodebatata', signOptions);
  return { token };
};
