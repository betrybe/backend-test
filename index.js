const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', controllers.userController);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ ok: false, message: 'Algo deu errado', errorMessage: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Lintening on ${PORT}`); });
