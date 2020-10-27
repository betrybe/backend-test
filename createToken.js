const jwt = require('jsonwebtoken');

module.exports = (user) => {
  const { password, ...userWithOutPassword } = user;
  const jwtConfig = {
    expiresIn: '2d',
    algorithm: 'HS256',
  };
  return jwt.sign(userWithOutPassword, 'xablau', jwtConfig);
};
