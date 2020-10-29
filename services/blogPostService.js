const { Op } = require('sequelize');

const validateInfos = (title, content) => {
  if (!title) return { err: true, status: 400, message: '"title" is required' };
  if (!content) return { err: true, status: 400, message: '"content" is required' };
  return { err: false };
};

const createPost = ({ Posts }) => async (title, content, id) => {
  const errorMessage = validateInfos(title, content);
  if (errorMessage.err) return errorMessage;

  return Posts.create({ title, content, userId: id });
};

const getPost = ({ Posts, Users }) => async () => Posts.findAll({
  include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  attributes: { exclude: ['userId'] },
});

const getPostById = ({ Posts, Users }) => async (id) => Posts.findOne({
  where: { id },
  include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  attributes: { exclude: ['userId'] },
}).then((post) => {
  if (post === null) {
    return { err: true, status: 404, message: 'Post não existe' };
  }
  return post;
});

const changePostById = ({ Posts }) => async (id, title, content, userId) => {
  const errorMessage = validateInfos(title, content);
  if (errorMessage.err) return errorMessage;

  return Posts.update(
    { title,
      content },
    { where: { id, userId } },
  ).then((post) => {
    if (post[0] === 0) {
      return { err: true, status: 401, message: 'Usuário não autorizado' };
    }
    return Posts.findOne({ where: { id } }).then((postUpdated) => {
      const { dataValues: { published, updated, id: noId, ...postValues } } = postUpdated;
      return postValues;
    });
  });
};

const deletePostById = ({ Posts }) => async (id, userId) =>
  Posts.destroy({
    where: { id, userId },
  }).then((user) => {
    if (user === 0) {
      return { err: true, status: 401, message: 'Usuário não autorizado' };
    }
    return user;
  });

const shearchPostByQuery = ({ Posts, Users }) => async (q) => Posts.findAll({
  include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  where: {
    [Op.or]: [
      { content: { [Op.like]: `%${q}%` } },
      { title: { [Op.like]: `%${q}%` } },
    ],
  },
});

const blogPostService = (model) => ({
  createPost: createPost(model),
  getPost: getPost(model),
  getPostById: getPostById(model),
  changePostById: changePostById(model),
  deletePostById: deletePostById(model),
  shearchPostByQuery: shearchPostByQuery(model),
});

module.exports = { blogPostService };
