const bodyParser = require('body-parser');
const express = require('express');
const { userController } = require('./controllers');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.post('/user', userController.createUser);

app.post('/login', userController.login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
