const { Router } = require('express');
const userLogin = require('../services/userServices');

const login = Router();

login.post('/', async (req, res) => {
  const { email = null, password } = req.body;
  userLogin(email, password);
  res.status(200).json({ teste: 'teste' });
});

module.exports = login;
