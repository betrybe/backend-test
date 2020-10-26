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
  try {
    const { title, content } = req.body;

    const post = await service.updatePost(req.params.id, title, content, req.user.id);

    if (post.error) return next(post.error);
    if (!post) return next('post_not_found');

    return res.status(200).json(post);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const postController = (service) => ({
  createPost: createPost(service),
  getAllWithUser: getAllWithUser(service),
  getById: getById(service),
  updatePost: updatePost(service),
});

module.exports = postController;
