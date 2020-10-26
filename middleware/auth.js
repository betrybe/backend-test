const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.SECRET || 'jwtSecret';

const authClient = () => (req, res, next) => {
  const { body } = req;
  const { email } = body;
  console.log(email, 'email');
  const token = jwt.sign({ email }, secret);
  req.headers = { authorization: token };
  console.log(req.headers);
  next();
};

module.exports = {
  authClient,
};
