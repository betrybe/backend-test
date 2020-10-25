const { Router } = require('express');
const { authClient } = require('../middleware/auth');
const { Users } = require('../models');

const login = Router();

login.post('/', authClient(), (req, res) => {
  Users.findAll().then((users) =>
    console.log(users));
  res.status(201).send('created user');
});

module.exports = login;
