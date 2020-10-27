const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', controller.UserController);
/* app.use('/login', controller.LoginController);
app.use('/post', controller.PostController); */
app.use((err, _req, res, _next) => {
  res.status(err.status).json({ message: err.message });
});
app.listen(3000, () => console.log('ouvindo porta 3000!'));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
