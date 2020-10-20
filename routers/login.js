const express = require('express');
const middlewares = require('../middlewares');
const { usersControllers: usersCrtl } = require('../controllers');

const login = express.Router();

login.post('/', usersCrtl.validate('login'), usersCrtl.getUserByEmail, middlewares.login(200));

module.exports = login;
