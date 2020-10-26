const { Router } = require('express');
const { authClient } = require('../middleware/auth');

const login = Router();



login.post('/', authClient(), (req, res) => {
  console.log(res)
  res.status(201).send(req.cookie.token);
});


module.exports = login;
