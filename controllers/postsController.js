const rescue = require('express-rescue');
const CustomError = require('../services/errorScheme');
const { postValidation } = require('../services/joiValidation');
const { Posts } = require('../models');

const createPost = rescue(async (req, res) => {
  const { body: { title, content } } = req;
  return postValidation.validateAsync({ title, content })
    .then(() => Posts.create({ title, content })
      .then((data) => res.status(200).send(data.dataValues))
      .catch((err) => {
        throw new CustomError({ message: err.message, code: err.code });
      }))
    .catch((err) => {
      throw new CustomError({ message: err.message, code: 400 });
    });
});

module.exports = {
  createPost,
};
