const Joi = require('joi');
const { User } = require('../models');

const isEmailUnique = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return true;
};

const validateSchema = (next, { email, displayName, password }) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required().error(() => next('invalid_name')),
    email: Joi.string().email().required().error(() => next('invalid_email')),
    password: Joi.string().min(6).required().error(() => next('invalid_password')),
  });
  return schema.validate({ email, displayName, password });
};

module.exports = async (req, _res, next) => {
  const { email, displayName, password } = req.body;
  if (!email) return next('email_required');
  if (!password) return next('password_required');
  validateSchema(next, { email, displayName, password });
  if (!await isEmailUnique(email)) return next('user_exists');
  next();
};
