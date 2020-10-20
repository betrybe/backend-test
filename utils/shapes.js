const Joi = require('joi');

const name = Joi.string().min(8);
const email = Joi.string().email().required();
const password = Joi.string().length(6).required();

module.exports = {
  name,
  email,
  password,
};
