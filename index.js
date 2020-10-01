require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const userRouter = require('./routers/userRouter');
const CustomError = require('./services/errorScheme');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);

app.use(rescue.from(
  CustomError,
  (err, req, res, _next) => {
    const { message, status } = err;
    return res.status(status).send({ error: message });
  },
));

// app.use((err, req, res, _next) => {
//   console.log(err);
//   const { message, code } = err;
//   return res.status(500).send({ error: { message, code } });
// });

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
