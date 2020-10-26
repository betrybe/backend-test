const createPost = (service) => async (req, res) => {
  const { title, content } = req.body;
  const post = await service.createPost({
    title,
    content,
    userId: req.user.id,
  });

  return res.status(201).json(post);
};

const getAllWithUser = (service) => async (req, res) => {
  const posts = await service.getAll();
  return res.status(200).json(posts);
};

const getById = (service) => async (req, res, next) => {
  const post = await service.getById(req.params.id);

  if (!post) return next('post_not_found');

  return res.status(200).json(post);
};

const updatePost = (service) => async (req, res, next) => {
  const { title, content } = req.body;

  const post = await service.updatePost(req.params.id, title, content, req.user.id);

  if (post.error) return next(post.error);
  if (!post) return next('post_not_found');

  return res.status(200).json(post);
};

const deletePost = (service) => async (req, res, next) => {
  const { title, content } = req.body;

  const post = await service.deletePost(req.params.id, title, content, req.user.id);

  if (!post) return next('post_not_found');

  return res.status(204).end();
};

const searchPost = (service) => async (req, res, next) => {
  const posts = await service.searchPost(req.query.q);
  if (!posts) return next('post_not_found');

  return res.status(200).json(posts);
};

const postController = (service) => ({
  createPost: createPost(service),
  getAllWithUser: getAllWithUser(service),
  getById: getById(service),
  updatePost: updatePost(service),
  deletePost: deletePost(service),
  searchPost: searchPost(service),
});

module.exports = postController;
