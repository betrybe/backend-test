const bodyParser = require('body-parser');
const express = require('express');
const { userController } = require('./controllers');
const { validateToken } = require('./utils');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.post('/user', userController.createUser);

app.post('/login', userController.login);

app.get('/user', validateToken, userController.getAllUsers);

app.get('/user/:id', validateToken, userController.getUserById);

app.delete('/user/me', validateToken, userController.deleteUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
