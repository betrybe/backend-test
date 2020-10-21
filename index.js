const bodyParser = require('body-parser');
const express = require('express');
const validateData = require('./controllers/validateData');
const userRouters = require('./routers/userRouters');

const app = express();

app.use(bodyParser.json());

app.use('/user', validateData, userRouters);

app.use((err, _req, res, _next) => {
  switch (err.original.errno) {
    case 1062:
      return res.status(409).json({ message: 'Usuário já existe' });

    default:
      break;
  }
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
