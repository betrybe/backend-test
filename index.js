const express = require('express');
const bodyParser = require('body-parser');
const { createUser, getAllUsers } = require('./controllers/userController');
const { makeLogin } = require('./controllers/loginController');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/user', createUser);
app.get('/user', authMiddleware, getAllUsers);

app.post('/login', makeLogin);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ ok: false, message: 'Algo deu errado', errorMessage: err.message });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
