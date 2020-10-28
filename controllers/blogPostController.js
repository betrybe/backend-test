const rescue = require('express-rescue');
const { verifyToken, verifyError } = require('../verifyToken');

const createPost = (services) =>
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { authorization } = req.headers;
    const validToken = verifyError(authorization, res);
    if (typeof validToken !== 'object') return;
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
    if (typeof validToken !== 'object') return;
    const post = await services.getPost();
    if (post.err) {
      const { message } = post;
      return res.status(400).json({ message });
    }
    res.status(201).json(post);
  });

const getPostById = (services) =>
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const validToken = verifyError(authorization, res);
    if (typeof validToken !== 'object') return;
    const post = await services.getPostById(id);
    if (post.err) {
      const { message } = post;
      return res.status(404).json({ message });
    }
    res.status(200).json(post);
  });

const changePostById = (services) =>
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    const { title, content } = req.body;
    const { id } = req.params;
    const validToken = verifyError(authorization, res);
    if (typeof validToken !== 'object') return;
    const post = await services.changePostById(id, title, content, validToken.id);
    if (post.err) {
      const { message, status } = post;
      return res.status(status).json({ message });
    }
    res.status(201).json(post);
  });

const blogPostController = (service) => ({
  createPost: createPost(service),
  getPost: getPost(service),
  getPostById: getPostById(service),
  changePostById: changePostById(service),
});

module.exports = { blogPostController };
