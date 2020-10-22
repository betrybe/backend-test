const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');
const Routers = require('./routers');

const start = async () => {
  const app = express();

  app.use(bodyParser.json());

  // não remova esse endpoint, e para o avaliador funcionar
  app.get('/', (request, response) => {
    response.send();
  });

  app.use('/user', Routers.users);
  // app.use('/login', Routers.login);
  // app.use('/post', Routers.post);

  app.use(middlewares.error);

  const { PORT = 3000 } = process.env;

  return [app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); }), app];
};

module.exports = start;
