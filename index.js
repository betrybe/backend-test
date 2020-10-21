const express = require('express');
const bodyParse = require('body-parse');

const { createNew } = require('./controllers/UsersController');

const app = express();
app.use(bodyParse.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user', createNew);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});