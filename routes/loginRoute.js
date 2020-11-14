const { Router } = require('express');
const rescue = require('express-rescue');

const { userControllers } = require('../controllers');
const { userLoginValidation } = require('../middlewares');

const login = Router();

login.post('/', userLoginValidation, rescue(userControllers.userLogin));

module.exports = login;
