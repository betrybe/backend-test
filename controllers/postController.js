const { Router } = require('express');
const {
  deleteMyPost,
  getAllPosts,
  getPostById,
  registerPost,
  updateMyPost,
} = require('../services/postServices');

const postRoute = Router();

const createPost = async (req, res, next) => {
  const { body: { title, content }, user: { id } } = req;
  const { ok, status, message, post } = await registerPost(title, content, id);
  return ok
    ? res.status(status).json(post)
    : next({ status, message });
};

const getPosts = async (_req, res) => {
  const posts = await getAllPosts();
  return res.status(200).json(posts);
};

const getOnePost = async (req, res, next) => {
  const { id } = req.params;
  const { ok, status, message, post } = await getPostById(id);
  return ok
    ? res.status(status).json(post)
    : next({ status, message });
};

const updatePost = async (req, res, next) => {
  const {
    params: { id: postId },
    user: { id: userId },
    body: { title, content },
  } = req;
  const {
    ok,
    status,
    message,
    post,
  } = await updateMyPost(postId, userId, title, content);
  return ok
    ? res.status(status).json(post)
    : next({ status, message });
};

const deletePost = async (req, res, next) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;
  const { ok, status = 200, message } = await deleteMyPost(postId, userId);
  return ok
    ? res.status(status).json()
    : next({ status, message });
};

postRoute.route('/').get(getPosts).post(createPost);
postRoute.route('/:id').get(getOnePost).put(updatePost).delete(deletePost);

module.exports = postRoute;

/**
 * endpoints:
 * GET /post/search?q=:searchTerm
 * pesquisa um post
 */
