const express = require('express');
const bodyparser = require('body-parser');
const UserController = require('./controllers/User');
const Validator = require('./middlewares/validator');

const app = express();

app.use(bodyparser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', Validator.createUser, UserController.createUser);

app.get('/user', UserController.getUsers);

app.post('/login', Validator.login, UserController.loginUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
