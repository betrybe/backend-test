const express = require('express');
const bodyParser = require('body-parser');

const { createNew } = require('./controllers/UserController');

const app = express();
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
  console.log('ouvindo na porta 3000');
});

app.post('/user', (req, res) => {
  const newUser = req.body.User;
  const creatNewUser = createNew.createNewUser(newUser);
  res.send(creatNewUser);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
