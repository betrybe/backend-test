const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const { errorHandler } = require('./middlewares');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', routes.user);
app.use('/login', routes.login);
app.use('/post', routes.post);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
