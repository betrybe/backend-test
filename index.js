const express = require('express');
const bodyParser = require('body-parser');

const { userRoute } = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/user', userRoute);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.use(errorHandler);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
