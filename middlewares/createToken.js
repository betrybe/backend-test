const jwt = require('jsonwebtoken');

const secret = '123456';
const tokenConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (password, email) => {
  const dados = { password, email };
  const token = jwt.sign({ data: dados }, secret, tokenConfig);
  return token;
};

module.exports = createToken;
