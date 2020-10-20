const express = require('express');
const middlewares = require('../middlewares');
const { usersControllers } = require('../controllers');

const login = express.Router();

login.post('/', usersControllers.validate('login'), middlewares.login);

module.exports = login;
