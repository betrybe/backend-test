const { Router } = require('express');
const auth = require('../middlewares/auth');

const postRoute = Router();

postRoute.route('/').get(auth(true)).post(auth(true));
postRoute.route('/:id').get(auth(true)).put(auth(true));
postRoute.route('/me').delete(auth(true));

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
