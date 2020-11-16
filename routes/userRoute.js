const { Router } = require('express');
const rescue = require('express-rescue');

const { userControllers } = require('../controllers');
const { userCreationValidation, authMiddleware } = require('../middlewares');

const user = Router();

user.get('/', authMiddleware(true), rescue(userControllers.getAll));

user.get('/:id', authMiddleware(true), rescue(userControllers.getUserById));

user.post('/', userCreationValidation, rescue(userControllers.userCreation));

user.delete('/me', authMiddleware(true), rescue(userControllers.deleteUser));

module.exports = user;
