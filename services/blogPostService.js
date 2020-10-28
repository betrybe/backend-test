const validateInfos = (title, content) => {
  if (!title) return { err: true, message: '"title" is required' };
  if (!content) return { err: true, message: '"content" is required' };
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

const blogPostService = (model) => ({
  createPost: createPost(model),
  getPost: getPost(model),
});

module.exports = { blogPostService };
