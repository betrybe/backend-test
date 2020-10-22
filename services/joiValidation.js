const Joi = require('joi');

const userValidation = Joi.object({
  displayName: Joi.string()
    .min(8)
    .required(),

  email: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}@[a-zA-Z0-9]{3,30}.*$'))
    .required()
    .messages({
      'string.pattern': '"email" must be a valid email',
      'any.required': '"email" is reuqired',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': '"password" length must be {#limit} characters long',
    }),

  image: Joi.string()
    .allow(null)
    .allow(''),
});

const loginValidation = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}@[a-zA-Z0-9]{3,30}.*$'))
    .required(),

  password: Joi.string()
    .min(6)
    .required(),
});

const postValidation = Joi.object({
  title: Joi.string()
    .min(3)
    .required(),

  content: Joi.string()
    .min(3)
    .required(),
});

module.exports = {
  userValidation,
  loginValidation,
  postValidation,
};
