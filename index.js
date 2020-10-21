const express = require('express');
const { createNew } = require('./controllers/UsersController');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.POST('/user', createNew);
