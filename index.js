const express = require('express');
const controllers = require('./controllers');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
  console.log('ouvindo na porta 3000');
});

app.use('/user', controllers.userController);

app.use((err, _req, res, _next) => {
  res.status(err.status).json({ message: err.message });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
