const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const postController = require('./controllers/postController');
const errorHandler = require('./middlewares/errorHandler');
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
app.use('/post', postController);
app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
