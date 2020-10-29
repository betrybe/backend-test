const rescue = require('express-rescue');
const { verifyError } = require('../verifyToken');

const createPost = (services) =>
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { authorization } = req.headers;
    const validToken = verifyError(authorization, res);
    if (typeof validToken !== 'object') return;
    const { id } = validToken;
    const post = await services.createPost(title, content, id);
    if (post.err) {
      const { message } = post;
      return res.status(400).json({ message });
    }
    const { dataValues: { updated, published, id: noId, ...insertedPost } } = post;
    return res.status(201).json(insertedPost);
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
    res.status(200).json(post);
  });

const getPostById = (services) =>
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const validToken = verifyError(authorization, res);
    if (typeof validToken !== 'object') return;
    const post = await services.getPostById(id);
    if (post.err) {
      const { message, status } = post;
      return res.status(status).json({ message });
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
    res.status(200).json(post);
  });

const deletePostById = (service) =>
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    const validToken = verifyError(authorization, res);
    const { id } = req.params;
    const { id: userId } = validToken;
    const getId = await service.getPostById(id);
    const { status: stats, message: msg } = getId;
    if (getId.err) return res.status(stats).json({ message: msg });
    const resp = await service.deletePostById(id, userId);
    const { err, status, message } = resp;
    if (err) return res.status(status).json({ message });
    return res.status(204).json();
  });

const shearchPostByQuery = (service) =>
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    const { q } = req.query;
    const validToken = verifyError(authorization, res);
    if (typeof validToken !== 'object') return;
    const byQuery = await service.shearchPostByQuery(q);
    return res.status(200).json(byQuery);
  });

const blogPostController = (service) => ({
  createPost: createPost(service),
  getPost: getPost(service),
  getPostById: getPostById(service),
  changePostById: changePostById(service),
  deletePostById: deletePostById(service),
  shearchPostByQuery: shearchPostByQuery(service),
});

module.exports = { blogPostController };
