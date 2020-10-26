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

const postController = (service) => ({
  createPost: createPost(service),
  getAllWithUser: getAllWithUser(service),
  getById: getById(service),
});

module.exports = postController;
