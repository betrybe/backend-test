const jwt = require('jsonwebtoken');

const secret = 'rdg123';

module.exports = (userObj) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const { password, ...user } = userObj;
  const token = jwt.sign({ user }, secret, jwtConfig);
  return token;
};
