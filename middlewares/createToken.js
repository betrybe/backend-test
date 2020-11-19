const jwt = require('jsonwebtoken');

const secret = '123456';
const tokenConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (password, email) => {
//   const dados = { password, email };
  const token = jwt.sign({ password, email }, secret, tokenConfig);
  return token;
};

module.exports = {
  createToken,
  secret,
};
