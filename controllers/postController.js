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

const getPostController = (service) => ({
  createPost: createPost(service),
  getAllPosts: getAllPosts(service),
});

module.exports = { getPostController };
