const bodyParser = require('body-parser');
const express = require('express');
const loginController = require('./controllers/loginController');
const validateUser = require('./controllers/validateUser');
const validateLogin = require('./controllers/validateLogin');
const userRouters = require('./routers/userRouters');
const postRouters = require('./routers/postRouters');
const validateToken = require('./utils/validateToken');

const app = express();

app.use(bodyParser.json());

app.post('/login', validateLogin, loginController);
app.use('/user', validateUser, userRouters);
app.use('/post', validateToken, postRouters);

app.use((err, _req, res, _next) => {
  switch (err.original.errno) {
    case 1062:
      return res.status(409).json({ message: 'Usuário já existe' });

    default:
      return res.status(400).json(err);
  }
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
