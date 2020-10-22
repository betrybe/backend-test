// Primeiro commit
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const user = require('./controllers/userController');

const app = express();

app.use('/', bodyParser.json());

app.use('/user', user);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
