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

const getPostService = (models) => ({
  createPost: createPost(models),
  getAllPosts: getAllPosts(models),
});

module.exports = { getPostService };
