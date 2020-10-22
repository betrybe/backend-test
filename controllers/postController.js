const rescue = require('express-rescue');
const { Op } = require('sequelize');
const Boom = require('boom');
const postService = require('../service/postService');
const { Posts, Users } = require('../models');

const createPost = rescue(async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.user;

  const { error } = postService.createPostSchema.validate({ title, content });

  if (error) return next(Boom.badRequest(error));

  const { dataValues } = await Posts.create({ userId: id, title, content });

  return res.status(201).json(dataValues);
});

const getAllPostWithOwner = rescue(async (_req, res, _next) => {
  const allPosts = await Posts
    .findAll({
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
      attributes: { exclude: ['userId'] },
    });

  return res.status(200).json(allPosts);
});

const getPostById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const getPost = await Posts.findAll({
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    where: { id },
  });

  if (getPost.length <= 0) return next(Boom.notFound('Post não existe'));

  return res.status(200).json(getPost[0].dataValues);
});

const updatePost = rescue(async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const { id: userId } = req.user;

  const { error } = postService.createPostSchema.validate({ title, content });

  if (error) return next(Boom.badRequest(error));

  const getPost = await Posts.findAll({ where: { id } });

  if (getPost.length <= 0) return next(Boom.notFound('Post não existe'));

  if (getPost[0].dataValues.userId !== userId) {
    return next(Boom.unauthorized('Usuário não autorizado'));
  }

  await Posts.update(
    { title, content },
    { where: { id } },
  );

  const updatedPost = await Posts.findAll({
    where: { id },
    attributes: { exclude: ['id', 'published', 'updated'] },
  });

  return res.status(200).json(updatedPost[0].dataValues);
});

const getPostsByQuery = rescue(async (req, res, _next) => {
  const { q } = req.query;

  const getAllByQuery = await Posts.findAll({
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    where: {
      [Op.or]: [
        { content: { [Op.like]: `%${q}%` } },
        { title: { [Op.like]: `%${q}%` } },
      ],
    },
  });

  return res.status(200).json(getAllByQuery);
});

const deletePostById = rescue(async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  const getPost = await Posts.findAll({ where: { id } });

  if (getPost.length <= 0) return next(Boom.notFound('Post não existe'));

  if (getPost[0].dataValues.userId !== userId) {
    return next(Boom.unauthorized('Usuário não autorizado'));
  }

  await Posts.destroy({ where: { id } });

  return res.status(204).json();
});

module.exports = {
  createPost,
  getAllPostWithOwner,
  getPostById,
  updatePost,
  getPostsByQuery,
  deletePostById,
};
