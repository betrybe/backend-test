const boom = require('@hapi/boom');

const { postServices } = require('../services');

const createPost = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.user;

  const post = await postServices.createPost({ title, content, id });

  if(!post) return next(boom.badRequest('Algo deu errado, post não foi criado'));

  res.status(201).json(post.dataValues);
};

module.exports = {
  createPost,
};
