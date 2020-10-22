require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { JsonWebTokenError } = require('jsonwebtoken');
const userRouter = require('./routers/userRouter');
const CustomError = require('./services/errorScheme');
const postsRouter = require('./routers/postsRouter');
const { login } = require('./controllers/userControllers');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);

app.use('/post', postsRouter);

app.post('/login', login);

app.use(rescue.from(
  JsonWebTokenError,
  (err, req, res, next) => {
    res.status(401).json({ message: 'Token expirado ou inválido', code: 401 });
    next();
  },
));

app.use(rescue.from(
  CustomError,
  (err, req, res, next) => {
    if (err.message === 'jwt malformed'
      || err.message === 'invalid signature') return res.status(401).json({ message: 'Token expirado ou inválido', code: 401 });

    res.status(err.code).json(err);
    next();
  },
));

app.use((err, req, res, next) => {
  res.status(err).json(err);
  next();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
