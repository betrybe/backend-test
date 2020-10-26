const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { loginController, userController } = require('./controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/login', loginController);
app.use('/user', userController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
