const express = require('express');
<<<<<<< HEAD
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const auth = require('./auth/authMiddleware');

const app = express();
app.use(bodyParser.json());

app.post('/user', userController.createNewUser);
app.post('/login', userController.userLogin);
app.get('/user/:id', auth, userController.getUserById);
app.get('/user', auth, userController.getAllUsers);
app.delete('/user/me', auth, userController.deleteSelfUser);
app.post('/post', auth, postController.createPost);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
=======

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

>>>>>>> 3ce1eebbb7db1be112b894350b8ace3c88f4e9d6
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
