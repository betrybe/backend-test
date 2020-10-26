const { body, validationResult } = require('express-validator');
const {
  DISPLAY_NAME,
  EMAIL,
  PASSWORD_NAME,
  EMAIL_IS_REQUIRED,
  PASSWORD_IS_REQUIRED,
  EMAIL_EMPTY,
  PASSWORD_EMPTY,
  TITLE_IS_REQUIRED,
  CONTENT_IS_REQUIRED,
} = require('./errorMessage');

const errMessage = (message) => ({ message });

const validate = (schemas, status) => async (req, res, next) => {
  await Promise.all(schemas.map((schema) => schema.run(req)));

  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  const err = result.array();
  return res.status(status).send(err[0].msg);
};

const dataValidationRules = [
  body('displayName', errMessage(DISPLAY_NAME)).exists().isString().isLength({ min: 8 }),
  body('email', errMessage(EMAIL)).notEmpty().isEmail(),
  body('password', errMessage(PASSWORD_NAME)).exists().isLength({ min: 6 }),
];

const dataExists = [
  body('email', errMessage(EMAIL_IS_REQUIRED)).exists(),
  body('password', errMessage(PASSWORD_IS_REQUIRED)).exists(),
];

const dataEmpty = [
  body('email', errMessage(EMAIL_EMPTY)).notEmpty(),
  body('password', errMessage(PASSWORD_EMPTY)).notEmpty(),
];

const postEmpty = [
  body('title', errMessage(TITLE_IS_REQUIRED)).notEmpty(),
  body('content', errMessage(CONTENT_IS_REQUIRED)).notEmpty(),
];

module.exports = {
  userValidate: validate(dataValidationRules, 400),
  userInfoExist: validate(dataExists, 400),
  userDataEmpty: validate(dataEmpty, 400),
  postDataEmpty: validate(postEmpty, 400),
};
