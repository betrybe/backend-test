const express = require('express');
const middlewares = require('../middlewares');
// const { usersControllers } = require('../controllers');

const login = express.Router();

login.post('/', middlewares.login);

module.exports = login;
