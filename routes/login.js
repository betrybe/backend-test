const { Router } = require('express');
const { user } = require('../controllers');

const login = Router();

login.post('/', user.login);

module.exports = login;
