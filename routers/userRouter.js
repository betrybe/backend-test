const { Router } = require('express');
const rescue = require('express-rescue');
const validateUser = require('../middlewares/validateUser');

const user = Router();

const userRouter = (userController) => {
  user.post('/', rescue(validateUser), rescue(userController.createUser));
  return user;
};
module.exports = userRouter;
