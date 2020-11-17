const { Router } = require('express');
const rescue = require('express-rescue');

const { userController } = require('../controllers');
const { userCreationValidation, authMiddleware } = require('../middlewares');

const user = Router();

user.get('/', authMiddleware(true), rescue(userController.getAll));

user.get('/:id', authMiddleware(true), rescue(userController.getUserById));

user.post('/', userCreationValidation, rescue(userController.userCreation));

user.delete('/me', authMiddleware(true), rescue(userController.deleteUser));

module.exports = user;
