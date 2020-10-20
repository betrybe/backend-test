const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');
const Routers = require('./routers');

const start = async () => {
  const app = express();

  app.use(bodyParser.json());

  const { PORT = 3000 } = process.env;

  // não remova esse endpoint, e para o avaliador funcionar
  app.get('/', (_request, response) => response.send());

  app.use('/user', Routers.users);

  app.use(middlewares.error);

  return [app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`)), app];
};

module.exports = start;
