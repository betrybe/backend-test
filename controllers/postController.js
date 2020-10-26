const rescue = require('express-rescue');

const createPost = (service) =>
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.user;

    const post = await service.createPost(title, content, id);

    return res.status(201).json(post);
  });

const getAllPosts = (service) =>
  rescue(async (_req, res) => {
    const posts = await service.getAllPosts();

    return res.status(200).json(posts);
  });

const getPostById = (service) =>
  rescue(async (req, res) => {
    const { id } = req.params;

    const post = await service.getPostById(id);

    if (post.errors) {
      return res.status(404).json(post.errors);
    }

    return res.status(200).json(post);
  });

const updatePost = (service) =>
  rescue(async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const { title, content } = req.body;

    const post = await service.getPostById(id);

    const postUserId = post.dataValues.user.dataValues.id;

    if (postUserId !== userId) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    await service.updatePost(title, content, id);

    const updatedPost = await service.getPostById(id);

    return res.status(200).json(updatedPost);
  });

const getPostBySearchTerm = (service) => rescue(async (req, res) => {
  const { q } = req.query;

  if (q === '') {
    const allPosts = await service.getAllPosts();

    return res.status(200).json(allPosts);
  }

  const posts = await service.getPostBySearchTerm(q);

  if (!posts) {
    return res.status(200).json([]);
  }

  return res.status(200).json(posts);
});

const deletePost = (service) =>
  rescue(async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;

    const post = await service.getPostById(id);

    if (post.errors) {
      res.status(404).json(post.errors);
    }

    const postUserId = post.dataValues.user.dataValues.id;

    if (postUserId !== userId) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    await service.deletePost(id);

    return res.status(204).end();
  });

const getPostController = (service) => ({
  createPost: createPost(service),
  getAllPosts: getAllPosts(service),
  getPostById: getPostById(service),
  updatePost: updatePost(service),
  getPostBySearchTerm: getPostBySearchTerm(service),
  deletePost: deletePost(service),
});

module.exports = { getPostController };
