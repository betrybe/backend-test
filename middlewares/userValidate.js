const { body, validationResult } = require('express-validator');
const {
  NULL_EMAIL,
  NULL_PASSWORD,
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
} = require('../services/errors');

const errMessage = (message) => ({
  message,
});

// const userValidationRules = [
//   body('email', errMessage(INVALID_ENTRY)).notEmpty().isEmail(),
//   body('name', errMessage(INVALID_ENTRY)).exists(),
//   body('password', errMessage(INVALID_ENTRY)).exists(),
// ];

// const emailValidate = [
//   check('email', errMessage(NULL_EMAIL)).exists(),
//   check('email', errMessage(EMPTY_EMAIL)).notEmpty(),
//   check('email', errMessage(INVALID_DATA)).isEmail(),
// ];

const loginValidationRules = [
  body('email', errMessage(NULL_EMAIL)).exists(),
  body('password', errMessage(NULL_PASSWORD)).exists(),
  body('email', errMessage(EMPTY_EMAIL)).custom((value) => value !== ''),
  body('password', errMessage(EMPTY_PASSWORD)).custom((value) => value !== ''),
];

// const recipeValidationRules = [
//   body('name', errMessage(INVALID_ENTRY)).exists(),
//   body('ingredients', errMessage(INVALID_ENTRY)).exists(),
//   body('preparation', errMessage(INVALID_ENTRY)).exists(),
// ];

// const recipeIdValidationRules = [
//   param('id', errMessage(RECIPE_NOT_FOUND)).isMongoId(),
// ];

const validate = (schemas, status) => async (req, res, next) => {
  await Promise.all(schemas.map((schema) => schema.run(req)));

  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  const errors = result.array();
  return res.status(status).json(errors[0].msg);
};

module.exports = {
  // userValidate: validate(userValidationRules, 400),
  loginValidate: validate(loginValidationRules, 400),
  // recipeValidate: validate(recipeValidationRules, 400),
  // recipeIdValidate: validate(recipeIdValidationRules, 404),
};
