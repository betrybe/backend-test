const Joi = require('joi');

const userValidation = Joi.object({
  displayName: Joi.string()
    .min(8)
    .required(),

  email: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}@[a-zA-Z0-9]{3,30}.*$'))
    .required(),

  password: Joi.string()
    .min(6)
    .required(),

  image: Joi.string()
    .allow(null)
    .allow(''),
});

module.exports = {
  userValidation,
};
