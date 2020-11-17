const userCreationValidation = require('./userCreationValidation');
const userLoginValidation = require('./userLoginValidation');
const authMiddleware = require('./authmiddleware');
const postValidation = require('./postValidation');
const errorHandler = require('./error');

module.exports = {
  userCreationValidation,
  userLoginValidation,
  authMiddleware,
  postValidation,
  errorHandler,
};
