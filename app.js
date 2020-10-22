const express = require('express');
const bodyParser = require('body-parser');

const start = async (Routers, config, middlewares) => {
  const app = express();

  app.use((req, _res, next) => {
    console.log(req.method, req.path);
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const { PORT = 3000 } = config;

  // não remova esse endpoint, e para o avaliador funcionar
  app.get('/', (_request, response) => response.send());

  app.use('/user', Routers.users);
  app.use('/login', Routers.login);
  app.use('/post', Routers.post);

  app.use(middlewares.error);

  return [app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`)), app];
};

module.exports = start;
