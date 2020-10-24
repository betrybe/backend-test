const Joi = require('joi');

const validateSchema = (next, { email, password }) => {
  const schema = Joi.object({
    email: Joi.string().email().required().error(() => next('invalid_email')),
    password: Joi.string().min(6).required().error(() => next('invalid_password')),
  });
  return schema.validate({ email, password });
};

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  if (email === '') return next('empty_email');
  if (password === '') return next('empty_password');
  if (!email) return next('email_required');
  if (!password) return next('password_required');
  validateSchema(next, { password, email });

  next();
};
