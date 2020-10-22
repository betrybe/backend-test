const Joi = require('joi');

const titleShema = Joi.string().required();

const contentShema = Joi.string().required();

const createPostSchema = Joi.object({
  title: titleShema,
  content: contentShema,
});

module.exports = {
  createPostSchema,
};
