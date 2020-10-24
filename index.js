const app = require('./app');

const config = { port: 3000 };

app
  .factory()
  .then((appInstance) => {
    appInstance.listen(config.port, () => {
      console.log(`Ouvindo na porta ${config.port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
