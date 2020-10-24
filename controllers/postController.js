const rescue = require('express-rescue');

const createPost = (service) =>
  rescue(async (req, res) => {
    const { title, content, userId } = req.body;

    const post = await service.createPost(title, content, userId);

    return res.status(201).json(post);
  });

const getPostController = (service) => ({
  createPost: createPost(service),
});

module.exports = { getPostController };
