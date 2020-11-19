const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', controllers.user);
app.use('/login', controllers.login);
app.use('/post', controllers.post);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
