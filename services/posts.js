const Joi = require('joi');

const { User, Post } = require('../models');
const shapes = require('../utils/shapes');
const { getDataValues } = require('../utils/models');

const validate = ({ title, content }) => Joi
  .object({ title: shapes.title, content: shapes.content })
  .validateAsync({ title, content })
  .catch((error, value) => ({ message: error.message, value }));

const createPost = async ({ title, content, userId }) => Post
  .create({ title, content, userId })
  .then(({ dataValues: { updated, published, id, ...post } }) => post);

const getAllPosts = async () => Post.findAll(
  { include: { model: User, as: 'user', attributes: { exclude: ['password'] } } },
)
  .then((res) => res && res.map(({ dataValues }) => dataValues));

const getUserFromPost = async (post) => post.getUser()
  .then(({ dataValues: { password, ...user } }) => user);

const getPostById = (id) => Post.findByPk(id)
  .then(async (post) => post && ({ ...getDataValues(post, ['userId']), user: await getUserFromPost(post) }))
  .then((post) => {
    if (!post) return { message: 'Post não existe' };
    const { userId, ...filteredPost } = post;
    return filteredPost;
  });

const updatePostById = (id, { title: t, content: c }) => Post
  .update({ title: t, content: c }, { where: { id } });

const deletePostById = (id) => Post.destroy({ where: { id } });

module.exports = {
  validate,
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
