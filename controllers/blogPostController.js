const rescue = require('express-rescue');
const { verifyToken, verifyError } = require('../verifyToken');

const createPost = (services) =>
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { authorization } = req.headers;
    const validToken = verifyError(authorization, res);
    if (validToken !== undefined) return;
    const { id } = verifyToken(authorization);
    const post = await services.createPost(title, content, id);
    if (post.err) {
      const { message = 'x' } = post;
      return res.status(400).json({ message });
    }
    const { dataValues: { updated, published, ...insertedPost } } = post;
    res.status(201).json(insertedPost);
  });

const getPost = (services) =>
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    const validToken = verifyError(authorization, res);
    if (validToken !== undefined) return;
    const post = await services.getPost();
    if (post.err) {
      const { message = 'x' } = post;
      return res.status(400).json({ message });
    }
    console.log(post);
    //const { dataValues: { updated, published, ...insertedPost } } = post;
    res.status(201).json(post);
  });

const blogPostController = (service) => ({
  createPost: createPost(service),
  getPost: getPost(service),
});

module.exports = { blogPostController };
