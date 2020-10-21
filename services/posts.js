const Joi = require('joi');

const { User, Post } = require('../models');
const shapes = require('../utils/shapes');

const validate = ({ title, content }) => Joi
  .object({ title: shapes.title, content: shapes.content })
  .validateAsync({ title, content });
// .catch((error, value) => ({ message: error.message, value }));

const createPost = async ({ title, content }) => Post.create({ title, content })
  .then(({ dataValues: { updated, published, id, ...post } }) => post);

const getAllPosts = async () => Post.findAll(
  { include: { model: User, as: 'user', attributes: { exclude: ['password'] } } },
)
  .then((res) => res && res.map(({ dataValues }) => dataValues));

const getPostById = (id) => Post.findByPk(id)
  .then((res) => {
    if (res) {
      const { dataValues: { updated, published, id: i, ...post } } = res.dataValues;
      return post;
    }
    return null;
  });

const updatePostById = (id, { title, content }) => Post.findByPk(id)
  .then((post) => post.update({ title, content }))
  .then((updatedPost) => {
    const user = updatedPost.getUser().then(({ password, ...creater }) => creater);
    return { ...updatedPost.dataValues, user };
  });

module.exports = {
  validate,
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
};
