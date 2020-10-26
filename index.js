const app = require('./app');
const config = require('./config');

app
  .factory(config)
  .then((appIntance) => {
    appIntance.listen(config.port, () => {
      console.log(`Ouvindo a porta ${config.port}`);
    });

    // não remova esse endpoint, e para o avaliador funcionar
    appIntance.get('/', (request, response) => {
      response.send();
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
