const express = require('express');
const bodyParser = require('body-parser');

const auth = require('./middlewares/auth');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const postController = require('./controllers/postController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userController);
app.use('/login', loginController);
app.use('/post', auth(true), postController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => res.send());

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
