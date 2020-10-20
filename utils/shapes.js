const Joi = require('joi');

const name = Joi.string().min(8).required();
const email = Joi.string().email().required();
const password = Joi.string().min(6).max(6).required();

module.exports = {
  name,
  email,
  password,
};
