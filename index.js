const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', routes.user);
app.use('/login', routes.login);
app.use('/post', routes.post);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
