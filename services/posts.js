const Joi = require('joi');

const validate = (_, { shapes }) => ({ title, content }) => Joi
  .object({ title: shapes.title, content: shapes.content })
  .validateAsync({ title, content })
  .catch((error, value) => ({ message: error.message, value }));

const createPost = ({ Post }) => async ({ title, content, userId }) => Post
  .create({ title, content, userId })
  .then(({ dataValues: { updated, published, id, ...post } }) => post);

const getAllPosts = ({ User, Post }) => async () => Post.findAll(
  { include: { model: User, as: 'user', attributes: { exclude: ['password'] } } },
)
  .then((res) => res && res.map(({ dataValues }) => dataValues));

const getUserFromPost = async (post) => post.getUser()
  .then(({ dataValues: { password, ...user } }) => user);

const getPostById = ({ Post }, { models: { getDataValues } }) => (id) => Post.findByPk(id)
  .then(async (post) => post && ({ ...getDataValues(post, ['userId']), user: await getUserFromPost(post) }))
  .then((post) => {
    if (!post) return { message: 'Post não existe' };
    const { userId, ...filteredPost } = post;
    return filteredPost;
  });

const updatePostById = ({ Post }) => (id, { title: t, content: c }) => Post
  .update({ title: t, content: c }, { where: { id } });

const deletePostById = ({ Post }) => async (id) => Post.destroy({ where: { id } });

const search = ({ User, Post, Op }) => async (searchString) => {
  const toSearch = { [Op.substring]: searchString };
  const where = { [Op.or]: [{ title: toSearch }, { content: toSearch }] };
  const include = { model: User, as: 'user', attributes: { exclude: ['password'] } };
  return Post.findAll({ where, include });
};

module.exports = (models, utils) => ({
  validate: validate(models, utils),
  createPost: createPost(models, utils),
  getAllPosts: getAllPosts(models, utils),
  getPostById: getPostById(models, utils),
  updatePostById: updatePostById(models, utils),
  deletePostById: deletePostById(models, utils),
  search: search(models, utils),
});
