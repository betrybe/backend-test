const Joi = require('joi');

const name = Joi.string().min(8);
const email = Joi.string().email().required();
const password = Joi.string().length(6).required();

const title = Joi.string().required();
const content = Joi.string().required();

module.exports = {
  name,
  email,
  password,
  title,
  content,
};
