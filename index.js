const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
// const auth = require('./middlewares/auth');
const loginController = require('./controllers/loginController');
const { loginValidate } = require('./middlewares/userValidate');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', loginValidate, loginController);
app.use('/user', userController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
