const jwt = require('jsonwebtoken');

const { SECRET = 'preguicadecriarumsegredo' } = process.env;

const config = { expiresIn: '1d', algorithm: 'HS256' };

const generate = (data) => jwt.sign({ data }, SECRET, config);

const verify = (token) => jwt.verify(token, SECRET);

module.exports = {
  generate,
  verify,
};
