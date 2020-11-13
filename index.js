const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const controllers = require('./controllers');

const app = express();

app.use(cors());
app.use(bodyParser.json());
const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('Vai');
});

app.use('/login', controllers.loginController);
// app.use('/user', controllers.userController);
// app.use('/post', controllers.postController);

app.use((err, _req, res, _next) => {
  if (err.payload) return res.status(err.status).json(err.payload);
  if (err.message.match(/^duplicate./i)) {
    return res.status(400).json({ message: 'E-mail already in database.' });
  }
  return res.status(500).json({ message: 'Internal Error' });
});
