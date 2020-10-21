const express = require('express');
const bodyParser = require('body-parser');

const factory = async () => {
  const app = express();

  app.use(bodyParser.json());

  // não remova esse endpoint, e para o avaliador funcionar
  app.get('/', (request, response) => {
    response.send();
  });

  return app;
};

module.exports = { factory };
