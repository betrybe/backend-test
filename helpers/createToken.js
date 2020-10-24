const jwt = require('jsonwebtoken');

module.exports = function createToken(data) {
  const signOptions = {
    algorithm: 'HS256',
    expiresIn: '2d',
  };
  const token = jwt.sign(data, 'paodebatata', signOptions);
  return { token };
};
