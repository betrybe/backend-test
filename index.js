const express = require('express');
const postController = require('./controller/postController');
const userController = require('./controller/userController');
const { authMiddleware } = require('./service/tokenService');

const app = express();
app.use(express.json());
// Caso contrário ele não irá processar as requests com jsons no body

app.listen(3000, () => console.log('Ouvindo porta 3000!'));
app.get('/', (_req, response) => response.send());

app.post('/user', userController.insertUser);
app.post('/login', userController.logUserIn);
app.get('/user', authMiddleware, userController.selectAll);
app.get('/user/:id', authMiddleware, userController.selectById);
app.delete('/user/me', authMiddleware, userController.selfDestruct);

app.post('/post', authMiddleware, postController.insertPost);
app.get('/post', authMiddleware, postController.listAll);
app.get('/post/search/', authMiddleware, postController.listByQuery);
app.get('/post/:id', authMiddleware, postController.listById);
app.put('/post/:id', authMiddleware, postController.updatePost);
app.delete('/post/:id', authMiddleware, postController.erasePost);
