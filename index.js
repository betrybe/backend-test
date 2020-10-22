const express = require('express');
const bodyParser = require('body-parser');
const { errorMiddleware, jwtMiddleware } = require('./middlewares/index');
const controllers = require('./controllers/index');

const app = express();

app.use(bodyParser.json());

app.post('/user', controllers.userController.registerUser);
app.post('/login', controllers.userController.userLogin);
app.get('/user/:id', jwtMiddleware(true), controllers.userController.getUserById);
app.delete('/user/me', jwtMiddleware(true), controllers.userController.deleteUserMe);
app.get('/user', jwtMiddleware(true), controllers.userController.getAllUsers);
app.post('/post', jwtMiddleware(true), controllers.postController.createPost);
app.get('/post', jwtMiddleware(true), controllers.postController.getAllPostWithOwner);
app.get('/post/:id', jwtMiddleware(true), controllers.postController.getPostById);

app.all('*', (_req, res) => res.status(404).json({ message: 'page not found' }));
app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
