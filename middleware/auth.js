const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.SECRET;

const authClient = () => (req, res, next) => {
  const { body } = req;
  const { email } = body;
  const token = jwt.sign({ email }, secret);
  req.cookie = {token}
  next();
};

module.exports = {
  authClient,
};
