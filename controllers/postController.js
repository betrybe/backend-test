const rescue = require('express-rescue');

const createPost = (service) =>
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.user;

    const post = await service.createPost(title, content, id);

    return res.status(201).json(post);
  });

const getPostController = (service) => ({
  createPost: createPost(service),
});

module.exports = { getPostController };
