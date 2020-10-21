const boom = require('@hapi/boom');
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());

app.use('/user', userController);

app.use((err, _, res, _next) => {
  if (boom.isBoom(err)) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }

  console.error(err);

  return res.status(500).json({ message: 'Internal error' });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });
