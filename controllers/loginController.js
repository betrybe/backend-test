const { Router } = require('express');
const { userLogin } = require('../services/userServices');

const login = Router();

login.post('/', async (req, res) => {
  const { email = null, password } = req.body;
  const { status, response } = await userLogin(email, password);
  res.status(status).json(response);
});

module.exports = login;
