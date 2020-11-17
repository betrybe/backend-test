const { Router } = require('express');
const rescue = require('express-rescue');

const { userController } = require('../controllers');
const { userLoginValidation } = require('../middlewares');

const login = Router();

login.post('/', userLoginValidation, rescue(userController.userLogin));

module.exports = login;
