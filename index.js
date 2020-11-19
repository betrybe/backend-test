const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const controllers = require('./controllers');
const { verifyToken } = require('./middlewares');
// const { default: rescue } = require('express-rescue');

const app = express();

app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use('/login', controllers.loginController);
app.use('/user', verifyToken, controllers.userController);
// app.use('/post', controllers.postController);
/*
app.use((err, _req, res, _next) => {
  if (err.payload) return res.status(err.status).json(err.payload);
  if (err.message.match(/^duplicate./i)) {
    return res.status(400).json({ message: 'E-mail already in database.' });
  }
  return res.status(500).json({ message: 'Internal Error' });
});
*/
