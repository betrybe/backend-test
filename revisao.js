/*
SOLID
S => SINGLE RESPONSABILITE UNIC = CADA UM NO SEU QUADRADO
O => Open closed = Aberto para extensão , fechada para modificação.
L => INversão de dependencias = (container, parametros)
Quem chama uma função é que da os parametros para ela trabalhar (dependêcias) awilix CONTAINER SEARCH
ex : conexão com banco;
Curren === func retorn func
*/

// config.js
MODULE_EXPORT = { enviroment: process.env.NODE_ENV || 'DEVELOPMENT' };

// app.js = configura a aplicação

const factory = () => {
  const app = express();

  app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    res.status(500).json({ message: 'error' });
  })

  return app;
};

// index.js subo a aplicação

const config;
const app;

app.factory(config).then().catch();

