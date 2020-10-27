const { Router } = require('express');
const models = require('../models');

const users = Router();

const { getUserService } = require('../services/userService');
const { getUserController } = require('../controllers/userController');

const userService = getUserService(models);
const userController = getUserController(userService);

users.post('/', userController.createUser);
users.get('/', userController.getAllUsers);
users.delete('/me', userController.deleteMe);
users.get('/:id', userController.getUserById);

module.exports = users;
