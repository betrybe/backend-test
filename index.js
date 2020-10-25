const express = require('express');
const appFile = require('./app');
const config = require('./config/config');
// ----------------

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// ----------------

appFile.factory(config)
  .then((appInstance) => {
    appInstance.listen(config.port, () => {
      console.log(`Listening on ${config.port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
