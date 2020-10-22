const express = require('express');
const bodyParser = require('body-parser');
const { errorMiddleware, jwtMiddleware } = require('./middlewares/index');
const controllers = require('./controllers/index');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', controllers.userController.registerUser);
app.post('/login', controllers.userController.userLogin);
app.get('/user/:id', jwtMiddleware, controllers.userController.getUserById);
app.delete('/user/me', jwtMiddleware, controllers.userController.deleteUserMe);
app.get('/user', jwtMiddleware, controllers.userController.getAllUsers);
app.post('/post', jwtMiddleware, controllers.postController.createPost);
app.get('/post', jwtMiddleware, controllers.postController.getAllPostWithOwner);
app.get('/post/search', jwtMiddleware, controllers.postController.getPostsByQuery);
app.get('/post/:id', jwtMiddleware, controllers.postController.getPostById);
app.put('/post/:id', jwtMiddleware, controllers.postController.updatePost);
app.delete('/post/:id', jwtMiddleware, controllers.postController.deletePostById);

app.all('*', (_req, res) => res.status(404).json({ message: 'page not found' }));
app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
