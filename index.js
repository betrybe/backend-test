const app = require('./app');
const config = require('./config');

app
  .factory()
  .then((appIntance) => {
    appIntance.listen(config.port, () => {
      console.log(`Ouvindo a porta ${config.port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
