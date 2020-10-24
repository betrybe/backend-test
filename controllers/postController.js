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
  console.log(posts)
  return res.status(200).json(posts);
};

const postController = (service) => ({
  createPost: createPost(service),
  getAllWithUser: getAllWithUser(service),
});

module.exports = postController;
