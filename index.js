require('dotenv/config');
const app = require('./app');

const { PORT = 3000 } = process.env;
const config = { port: PORT };

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
