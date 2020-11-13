const jwt = require('jsonwebtoken');

const secret = '123456';
const tokenConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (userId, email) => {
  const dados = { userId, email };
  const token = jwt.sign({ data: dados }, secret, tokenConfig);
  return token;
};

module.exports = createToken;
