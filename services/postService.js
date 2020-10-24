const createPost = ({ Posts }) => async (title, content, userId) =>
  Posts.create({ title, content, userId });

const getPostService = (models) => ({
  createPost: createPost(models),
});

module.exports = { getPostService };
