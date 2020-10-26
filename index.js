const express = require('express');

const users = require('./apresetation/controllers');

const app = express();
app.use(express.json());

app.use('/user', users.user);
app.use('/login', users.login);
app.use('/post', users.post);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
