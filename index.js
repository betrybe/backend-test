const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

/**
 * endpoints:
 * criar user
 * POST /user
 * logar user
 * POST /login
 * pegar users
 * GET /user
 * pegar user por id
 * GET /user/:id
 * apaga os eu user
 * DELETE /user/me
 * cria um post
 * POST /post
 * retorna todos os posts
 * GET /post
 * retorna um post pelo id
 * GET /post/:id
 * sobrescreve o post
 * PUT /post/:id
 * pesquisa um post
 * GET /post/search?q=:searchTerm
 * deleta um post
 * DELETE /post/:id
 */
