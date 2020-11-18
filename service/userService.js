const Joi = require('joi');

const nameSchema = Joi.string().min(8);

const emailSchema = Joi.string().email().required();

const passwordSchema = Joi.string().length(6).required();

const registerUserSchema = Joi.object({
  displayName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginUserSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
};
