const createPost = ({ Posts }) => async (title, content, userId) =>
  Posts.create({ title, content, userId });

const getAllPosts = ({ Posts, Users }) => async () =>
  Posts.findAll({
    include: {
      model: Users,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
  });

const getPostById = ({ Posts, Users }) => async (id) => {
  const post = await Posts.findByPk(id, {
    include: {
      model: Users,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
  });

  if (!post) {
    return { errors: { message: 'Post não existe' } };
  }

  return post;
};

const updatePost = ({ Posts }) => async (title, content, id) =>
  Posts.update({ title, content }, { where: { id } });

const getPostService = (models) => ({
  createPost: createPost(models),
  getAllPosts: getAllPosts(models),
  getPostById: getPostById(models),
  updatePost: updatePost(models),
});

module.exports = { getPostService };
