require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const error = require('./services/errorScheme');
const userRouter = require('./routers/userRouter');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);

app.use(rescue.from(
  error.UserAlreadyRegistered,
  (err, req, res, _next) => {
    const { message, status } = err;
    return res.status(status).send({ error: { message, code: status } });
  },
));

app.use(rescue.from(
  error.CommonValidationError,
  (err, req, res, _next) => {
    const { message, status } = err;
    return res.status(status).send({ error: { message, code: status } });
  },
));

app.use(rescue.from(
  error.UserNotFound,
  (err, req, res, _next) => {
    const { message, status } = err;
    return res.status(status).send({ error: { message, code: status } });
  },
));

app.use(rescue.from(
  error.TokenNotFound,
  (err, req, res, _next) => {
    const { message, status } = err;
    return res.status(status).send({ error: { message, code: status } });
  },
));

app.use(rescue.from(
  error.GeneralError,
  (err, req, res, _next) => {
    const { message, status } = err;
    return res.status(status).send({ error: { message, code: status } });
  },
));

app.use((err, req, res, _next) => {
  const { message } = err;
  return res.status(500).send({ error: { message, code: 500 } });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
