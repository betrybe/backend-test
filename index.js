const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers');

const app = express();
app.use(bodyParser.json());

app.use('/user', controller.user);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
