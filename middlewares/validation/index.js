const Joi = require('joi');

const schemas = {
  userSchema: Joi.object({
    displayName: Joi.string().min(8).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'br'],
        },
      })
      .required(),
    password: Joi.string().min(6).max(12).required(),
    image: Joi.string().uri(),
  }),
  loginSchema: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'br'],
        },
      })
      .required(),
    password: Joi.string().min(6).max(12).required(),
  }),
  postSchema: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

const validateSchema = (schema) => async (req, _res, next) => {
  try {
    await schema.validateAsync(req.body, {
      render: false,
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  schemas,
  validateSchema,
};
