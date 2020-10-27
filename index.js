const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const auth = require('./services/auth');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.get('/test', postController.test);

app.delete('/user/me', auth, userController.deleteMe);
app.get('/user/:id', auth, userController.getUser);
app.get('/user', auth, userController.userList);
app.post('/user', userController.createUser);

app.get('/post/search', auth, postController.queryPost);
app.delete('/post/:id', auth, postController.removePost);
app.get('/post/:id', auth, postController.getPost);
app.put('/post/:id', auth, postController.updatePost);
app.get('/post', auth, postController.postsList);
app.post('/post', auth, postController.newPost);

app.post('/login', userController.loginUser);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
