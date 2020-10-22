// Primeiro commit
const express = require('express');
const bodyParser = require('body-parser');
const { userActions: user } = require('./controllers/userController');
const { postActions: post } = require('./controllers/postController');
const login = require('./controllers/loginController');

const app = express();

app.use('/', bodyParser.json());

app.use('/user', user);

app.use('/login', login);

app.use('/post', post);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
