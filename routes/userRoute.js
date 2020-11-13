const { Router } = require('express');
const rescue = require('express-rescue');

const { userControllers } = require('../controllers');
const { userCreationValidation } = require('../middlewares');

const user = Router();

user.post('/', userCreationValidation, rescue(userControllers.userCreation));

module.exports = user;
