const { Router } = require('express');
const { authClient } = require('../middleware/auth');

const login = Router();

login.post('/', authClient(), (req, res) => {
  console.log(req.body);
  return res.status(201);
});

module.exports = login;
