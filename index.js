const express = require('express');
const bodyParser = require('body-parser');

const { user } = require('./controller');
const { posts } = require('./controller');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', user.createUser);
app.get('/user', user.getAllUsers);
app.get('/user/:id', user.getUserById);
app.delete('/user/me', user.deleteMe);

app.post('/post', posts.createPost);
app.get('/post', posts.getAllPost);
app.get('/post/:id', posts.getPostById);
app.put('/post/:id', posts.editPostById);
app.get('/post/search?q=:searchTerm', posts.searchByQuery);
app.delete('/post/:id', posts.deletePost);

app.post('/login', user.login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
