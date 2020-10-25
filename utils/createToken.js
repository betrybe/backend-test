const jwt = require('jsonwebtoken');
const { SECRET } = require('./SECRET');

const createToken = ({ email, id }) => {
  const userObject = { email, id };
  const token = jwt.sign(userObject, SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });
  return token;
};

module.exports = createToken;
