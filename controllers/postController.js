const rescue = require('express-rescue');
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

module.exports = {
  createPost,
  getAllPostWithOwner,
  getPostById,
};
