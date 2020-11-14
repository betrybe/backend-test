const { Router } = require('express');
const rescue = require('express-rescue');

const { userControllers } = require('../controllers');
const { userCreationValidation, authMiddleware } = require('../middlewares');

const user = Router();

user.get('/', authMiddleware(true), rescue(userControllers.getAll));

user.post('/', userCreationValidation, rescue(userControllers.userCreation));

module.exports = user;
