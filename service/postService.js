const createPost = (models) => (title, content) =>
  models.Post.create({ title, content });

const getPosts = (models) => () => models.Post.findAll();

const getPostsById = (models) => (id) => models.Post.findByPk(id);

const putPosts = (models) => (title, content, id) =>
  models.Post.update({ title, content }, { where: { id } }).then(() => {
    models.Post.findByPk(id);
  });

const deletePost = (models) => (id) =>
  models.Post.destroy(id);

const getPostService = (models) => ({
  createPost: createPost(models),
  getPosts: getPosts(models),
  getPostsById: getPostsById(models),
  putPosts: putPosts(models),
  deletePost: deletePost(models),
});

module.exports = { getPostService };
