const jwt = require('jsonwebtoken');
require('dotenv/config');

const SECRETE_KEY = process.env.SECRETE_KEY || 'l2UPGGeOuHP5cS1lhofe';

const validateToken = (token) => {
  jwt.verify(token, SECRETE_KEY, (err) => err);
};

module.exports = validateToken;
