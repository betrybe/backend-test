const { Router } = require('express');
const { authClient } = require('../middleware/auth');

const login = Router();

login.post('/', authClient(), (req, res) => {
  console.log(req.body);
  res.status(201).send('created user');
});

module.exports = login;
