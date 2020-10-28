const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routes.userRoute);
app.use('/login', routes.loginRoute);
app.use('/post', routes.postRoute);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
