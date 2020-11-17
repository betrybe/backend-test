const boom = require('@hapi/boom');

const { postServices } = require('../services');

const createPost = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.user;

  const post = await postServices.createPost({ title, content, id });

  if (!post) return next(boom.badRequest('Algo deu errado, post não foi criado'));

  res.status(201).json(post.dataValues);
};

const getAllPosts = async (_req, res, next) => {
  const posts = await postServices.getAllPosts();

  if (!posts) return next(boom.badRequest('Algo deu errado'));

  res.status(200).json(posts);
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;

  const post = await postServices.getPostById(id);

  if (!post) return next(boom.notFound('Post não existe'));

  res.status(200).json(post);
};

const updatePostById = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const { id: idLoged } = req.user;

  const editedPost = await postServices.updatePostById({ title, content, id, idLoged });

  if (!editedPost) return next(boom.unauthorized('Usuário não autorizado'));

  res.status(200).json(editedPost);
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const { id: idLoged } = req.user;

  const deletedPost = await postServices.deletePost({ id, idLoged });

  if (deletedPost && deletedPost.message === 'Post não existe') return next(boom.notFound(deletedPost.message));

  if (deletedPost && deletedPost.message === 'Usuário não autorizado') return next(boom.unauthorized(deletedPost.message));

  res.status(204).end();
};

module.exports = {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePostById,
};
