const { Router } = require('express');
const rescue = require('express-rescue');
const { validateUser, validateToken } = require('../middlewares/index');

const user = Router();

const userRouter = (userController, models) => {
  user.post('/', rescue(validateUser(models)), rescue(userController.createUser));
  user.get('/', rescue(validateToken), rescue(userController.getAll));
  user.get('/:id', rescue(validateToken), rescue(userController.getById));
  user.delete('/me', rescue(validateToken), rescue(userController.deleteMe));
  return user;
};
module.exports = userRouter;
