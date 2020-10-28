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
  if (post.length === 0) {
    return { err: true, message: 'Post não existe' };
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
      const { dataValues: { published, updated, ...postValues } } = postUpdated;
      return postValues;
    });
  });
};

const blogPostService = (model) => ({
  createPost: createPost(model),
  getPost: getPost(model),
  getPostById: getPostById(model),
  changePostById: changePostById(model),
});

module.exports = { blogPostService };
