const { User, Post } = require('../models');

const createPost = async ({ title, content }) => Post.create({ title, content })
  .then(({ dataValues: { updated, published, id, ...post } }) => post);

const getAllPosts = async () => Post.findAll(
  { include: { model: User, as: 'user', attributes: { exclude: ['password'] } } },
)
  .then((res) => res && res.map(({ dataValues }) => dataValues));

const getPostById = (id) => Post.getByPk(id)
  .then((res) => {
    if (res) {
      const { dataValues: { updated, published, id: i, ...post } } = res.dataValues;
      return post;
    }
    return null;
  });

const getUserIdFromPostById = async (id) => Post.getByPk(id)
  .then((res) => {
    if (res) return res.dataValues.user_id;
    return { message: 'No post' };
  });

const updatePostById = (id) => Post.update({ where: { id } })
  .then((post) => post && post.getUser()
    .then(({ password, ...user }) => user));

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
};
