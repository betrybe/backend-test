const bodyParser = require('body-parser');
const express = require('express');
const userRouters = require('./routers/userRouters');

const app = express();

app.use(bodyParser.json());
app.use('/user', userRouters);

app.use((err, req, res, next) => {
  res.status(500).json({ err: err.errors[0].message });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
