const { Router } = require('express');
const rescue = require('express-rescue');

const { userControllers } = require('../controllers');
const { userLoginValidation, authMiddleware } = require('../middlewares');

const login = Router();

login.post('/', userLoginValidation, rescue(userControllers.userLogin));

module.exports = login;
