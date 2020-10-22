const express = require('express');

const makeRouter = (_, middlewares) => {
  const login = express.Router();
  login.post('/', middlewares.login);
  return login;
};

module.exports = makeRouter;
