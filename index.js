const express = require('express');
const bodyParser = require('body-parser');
const { createUser, getAllUsers, getUserById, deleteUser } = require('./controllers/userController');
const { createPost, listAllPosts, listPostById, updatePost, deletePost } = require('./controllers/postController');
const { makeLogin } = require('./controllers/loginController');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/user', createUser);
app.get('/user', authMiddleware, getAllUsers);
app.delete('/user/me', authMiddleware, deleteUser);
app.get('/user/:id', authMiddleware, getUserById);

app.post('/login', makeLogin);

app.post('/post', authMiddleware, createPost);
app.get('/post', authMiddleware, listAllPosts);
app.get('/post/:id', authMiddleware, listPostById);
app.put('/post/:id', authMiddleware, updatePost);
app.delete('/post/:id', authMiddleware, deletePost);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ ok: false, message: 'Algo deu errado', errorMessage: err.message });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
