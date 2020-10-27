const createPosts = (service) => async (req, res) => {
  const { title, content } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });

  const resultPost = await service.createPost(title, content, 'userId');
  return res.status(201).json(resultPost);
};

const getPosts = (service) => async (req, res) =>
  service.getPosts(service).then((result) => {
    if (result.length === 0) return res.status(404).json({ message: 'not found' });
    return res.status(200).json(result);
  });

const getPostsById = (service) => async (req, res) => {
  const { id } = req.params;
  service.getPostsById(id).then((result) => {
    if (!result) return res.status(404).json({ message: 'not found' });
    return res.status(200).json(result);
  });
};

const putPosts = (service) => async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  service.putPosts(id, title, content).then((result) => {
    res.status(200).json(result);
  });
};

const deletePost = (service) => async (req, res) => {
  const { id } = req.params;
  service.deletePost(id).then(() => {
    res.status(201).end();
  });
};

const getPostControllers = (service) => ({
  createPosts: createPosts(service),
  getPosts: getPosts(service),
  getPostsById: getPostsById(service),
  putPosts: putPosts(service),
  deletePost: deletePost(service),
});

module.exports = { getPostControllers };
