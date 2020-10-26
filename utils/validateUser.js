const Joi = require('joi');
const validate = require('../middlewares/validate');

module.exports = validate(
  Joi.object({
    displayName: Joi.string().length(8).error({ message: 'Erro no nome' }),
    email: Joi.string().email().required(),
    password: Joi.string().length(8).required(),
  }),
);
