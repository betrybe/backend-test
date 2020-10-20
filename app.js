const express = require('express');
const bodyParser = require('body-parser');

const Routers = require('./routers');
const models = require('./models');

const start = async () => {
  const app = express();

  console.log(Object.keys(models));
  app.use(bodyParser.json());

  const { PORT = 3000 } = process.env;

  // não remova esse endpoint, e para o avaliador funcionar
  app.get('/', (_request, response) => response.send());

  app.use('/user', Routers.users(models));

  return [app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`)), app];
};

module.exports = start;
