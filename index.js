const bodyParser = require('body-parser');
const express = require('express');
const { userController, postController } = require('./controllers');
const { validateToken } = require('./utils');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.post('/user', userController.createUser);

app.post('/login', userController.login);

app.post('/post', validateToken, postController.createPost);

app.get('/user', validateToken, userController.getAllUsers);

app.get('/post', validateToken, postController.getAllPosts);

app.get('/user/:id', validateToken, userController.getUserById);

app.get('/post/:id', validateToken, postController.getPostById);

app.put('/post/:id', validateToken, postController.updatePostById);

app.delete('/user/me', validateToken, userController.deleteUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
