const { Router } = require('express');
const userController = require('../controllers/user');

const login = Router();

login.post('/', userController.login);

module.exports = login;
