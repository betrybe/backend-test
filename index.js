require('dotenv').config();

const { GeneralError } = ('./services/errorScheme');
const rescue = require('express-rescue');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRouter);

app.use(rescue.from(GeneralError, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use((err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
