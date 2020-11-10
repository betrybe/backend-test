const { Router } = require('express');
const {
  getAllPosts,
  registerPost,
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
  const filteredPosts = posts.map(({ dataValues }) => dataValues);
  console.log(filteredPosts)
  return res.status(200).json(filteredPosts);
};

postRoute.route('/').get(getPosts).post(createPost);
postRoute.route('/:id').get().put();
postRoute.route('/me').delete();

module.exports = postRoute;

/**
 * endpoints:
 * POST /post
 * cria um post
 * GET /post
 * retorna todos os posts
 * GET /post/:id
 * retorna um post pelo id
 * PUT /post/:id
 * sobrescreve o post
 * GET /post/search?q=:searchTerm
 * pesquisa um post
 * DELETE /post/:id
 * deleta um post
 */
